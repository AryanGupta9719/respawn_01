-- Respawn v0.2. Paste the WHOLE file into Supabase SQL Editor and Run.
-- Additive, rerunnable migration. Does not drop existing user data.
-- Read access is isolated by auth.uid(); all snapshot writes use a versioned RPC.
begin;
create table if not exists public.preparc_states (
 user_id uuid primary key references auth.users(id) on delete cascade,
 state jsonb not null default '{}'::jsonb check(jsonb_typeof(state)='object'),
 revision bigint not null default 0 check(revision>=0),
 updated_at timestamptz not null default now()
);
create table if not exists public.preparc_plan_versions (
 id bigint generated always as identity primary key,
 user_id uuid not null references auth.users(id) on delete cascade,
 revision bigint not null,
 plan jsonb not null,
 tasks jsonb not null default '[]'::jsonb,
 created_at timestamptz not null default now(),
 unique(user_id,revision)
);
create table if not exists public.preparc_save_events (
 user_id uuid not null references auth.users(id) on delete cascade,
 event_id uuid not null,
 payload_hash text not null,
 revision bigint not null,
 created_at timestamptz not null default now(),
 primary key(user_id,event_id)
);
create table if not exists public.preparc_ai_usage (
 user_id uuid not null references auth.users(id) on delete cascade,
 usage_date date not null,
 requests integer not null default 0 check(requests>=0),
 primary key(user_id,usage_date)
);
create table if not exists public.preparc_problem_bank (
 problem_id integer primary key check(problem_id between 1 and 196),
 title text not null,
 topic text not null,
 tier smallint not null check(tier between 1 and 3),
 difficulty text not null check(difficulty in ('E','M','H')),
 metadata jsonb not null default '{}'::jsonb,
 review_status text not null default 'pending_review',
 content_version integer not null default 1
);
create index if not exists preparc_versions_owner_created on public.preparc_plan_versions(user_id,created_at desc);
alter table public.preparc_states enable row level security;
alter table public.preparc_plan_versions enable row level security;
alter table public.preparc_save_events enable row level security;
alter table public.preparc_ai_usage enable row level security;
alter table public.preparc_problem_bank enable row level security;
revoke all on public.preparc_states,public.preparc_plan_versions,public.preparc_save_events,public.preparc_ai_usage,public.preparc_problem_bank from anon,authenticated;
grant select on public.preparc_states,public.preparc_plan_versions,public.preparc_ai_usage to authenticated;
grant select on public.preparc_problem_bank to anon,authenticated;
drop policy if exists preparc_own_state on public.preparc_states;
create policy preparc_own_state on public.preparc_states for select to authenticated using ((select auth.uid())=user_id);
drop policy if exists preparc_own_versions on public.preparc_plan_versions;
create policy preparc_own_versions on public.preparc_plan_versions for select to authenticated using ((select auth.uid())=user_id);
drop policy if exists preparc_own_usage on public.preparc_ai_usage;
create policy preparc_own_usage on public.preparc_ai_usage for select to authenticated using ((select auth.uid())=user_id);
drop policy if exists preparc_read_catalog on public.preparc_problem_bank;
create policy preparc_read_catalog on public.preparc_problem_bank for select to anon,authenticated using (true);
-- No client write policies. The definer functions below derive user_id from
-- the authenticated JWT, have a fixed search_path, and expose no arbitrary owner argument.
create or replace function public.save_preparc_state(p_state jsonb,p_expected_revision bigint,p_event_id uuid)
returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare
 uid uuid:=auth.uid(); current_revision bigint; old_state jsonb;
 known public.preparc_save_events%rowtype; new_revision bigint;
 fingerprint text:=md5(p_state::text);
begin
 if uid is null then raise exception 'Authentication required' using errcode='28000'; end if;
 if p_event_id is null or p_expected_revision is null or p_expected_revision<0 then raise exception 'Invalid save parameters'; end if;
 if p_state is null or jsonb_typeof(p_state)<>'object' or octet_length(p_state::text)>2000000 then raise exception 'Invalid or oversized state'; end if;
 if p_state ? 'tasks' and (jsonb_typeof(p_state->'tasks')<>'array') then raise exception 'tasks must be an array'; end if;
 if p_state ? 'tasks' and jsonb_array_length(p_state->'tasks')>5000 then raise exception 'Too many activities'; end if;
 insert into public.preparc_states(user_id) values(uid) on conflict(user_id) do nothing;
 select revision,state into current_revision,old_state from public.preparc_states where user_id=uid for update;
 select * into known from public.preparc_save_events where user_id=uid and event_id=p_event_id;
 if found then
  if known.payload_hash<>fingerprint then raise exception 'Event ID reused with another payload'; end if;
  return jsonb_build_object('revision',known.revision,'duplicate',true);
 end if;
 if current_revision<>p_expected_revision then raise exception 'Cloud copy changed; reload before saving' using errcode='40001'; end if;
 new_revision:=current_revision+1;
 update public.preparc_states set state=p_state,revision=new_revision,updated_at=now() where user_id=uid;
 -- Snapshot only changes to the actual plan or task dates/outcomes, not every preference edit.
 if (old_state->'plan') is distinct from (p_state->'plan') or (old_state->'tasks') is distinct from (p_state->'tasks') then
  insert into public.preparc_plan_versions(user_id,revision,plan,tasks) values(uid,new_revision,coalesce(p_state->'plan','null'::jsonb),coalesce(p_state->'tasks','[]'::jsonb));
 end if;
 insert into public.preparc_save_events(user_id,event_id,payload_hash,revision) values(uid,p_event_id,fingerprint,new_revision);
 return jsonb_build_object('revision',new_revision,'duplicate',false);
end $$;
revoke all on function public.save_preparc_state(jsonb,bigint,uuid) from public,anon;
grant execute on function public.save_preparc_state(jsonb,bigint,uuid) to authenticated;
create or replace function public.consume_ai_quota()
returns boolean language plpgsql security definer set search_path=public,pg_temp as $$
declare uid uuid:=auth.uid(); n integer; day_utc date:=(now() at time zone 'UTC')::date;
begin
 if uid is null then raise exception 'Authentication required' using errcode='28000'; end if;
 insert into public.preparc_ai_usage(user_id,usage_date,requests) values(uid,day_utc,0) on conflict do nothing;
 update public.preparc_ai_usage set requests=requests+1 where user_id=uid and usage_date=day_utc and requests<5 returning requests into n;
 return n is not null;
end $$;
revoke all on function public.consume_ai_quota() from public,anon;
grant execute on function public.consume_ai_quota() to authenticated;
-- 196 canonical titles and draft metadata follow. Existing manually reviewed rows
-- are preserved by ON CONFLICT DO NOTHING. Curriculum changes need a new migration.
insert into public.preparc_problem_bank(problem_id,title,topic,tier,difficulty,metadata) values
(1,'Even or odd','Basics and numbers',1,'E','{"core":true,"prereqs":[],"estimate":30,"note":""}'::jsonb),
(2,'Largest of three numbers','Basics and numbers',1,'E','{"core":false,"prereqs":[],"estimate":30,"note":""}'::jsonb),
(3,'Leap year check','Basics and numbers',1,'E','{"core":false,"prereqs":[],"estimate":30,"note":""}'::jsonb),
(4,'Sum of first N natural numbers','Basics and numbers',1,'E','{"core":false,"prereqs":[],"estimate":30,"note":""}'::jsonb),
(5,'Count digits of a number','Basics and numbers',1,'E','{"core":true,"prereqs":[1],"estimate":30,"note":""}'::jsonb),
(6,'Sum of digits','Basics and numbers',1,'E','{"core":true,"prereqs":[5],"estimate":30,"note":""}'::jsonb),
(7,'Reverse a number','Basics and numbers',1,'E','{"core":true,"prereqs":[5],"estimate":30,"note":""}'::jsonb),
(8,'Palindrome number','Basics and numbers',1,'E','{"core":true,"prereqs":[7],"estimate":30,"note":""}'::jsonb),
(9,'Factorial','Basics and numbers',1,'E','{"core":true,"prereqs":[1],"estimate":30,"note":""}'::jsonb),
(10,'Fibonacci series up to N','Basics and numbers',1,'E','{"core":true,"prereqs":[1],"estimate":30,"note":""}'::jsonb),
(11,'Prime number check','Basics and numbers',1,'E','{"core":true,"prereqs":[1],"estimate":30,"note":""}'::jsonb),
(12,'Print primes in a range','Basics and numbers',1,'E','{"core":false,"prereqs":[11],"estimate":30,"note":""}'::jsonb),
(13,'GCD and LCM of two numbers','Basics and numbers',1,'E','{"core":true,"prereqs":[1],"estimate":30,"note":""}'::jsonb),
(14,'Armstrong number','Basics and numbers',1,'E','{"core":false,"prereqs":[6,18],"estimate":30,"note":""}'::jsonb),
(15,'Perfect number','Basics and numbers',1,'E','{"core":false,"prereqs":[11],"estimate":30,"note":""}'::jsonb),
(16,'Strong number','Basics and numbers',1,'E','{"core":false,"prereqs":[6,9],"estimate":30,"note":""}'::jsonb),
(17,'Harshad number','Basics and numbers',1,'E','{"core":false,"prereqs":[6],"estimate":30,"note":""}'::jsonb),
(18,'Power of a number (without built-in pow)','Basics and numbers',1,'E','{"core":true,"prereqs":[1],"estimate":30,"note":""}'::jsonb),
(19,'Decimal to binary','Basics and numbers',1,'E','{"core":true,"prereqs":[5],"estimate":30,"note":""}'::jsonb),
(20,'Binary to decimal','Basics and numbers',1,'E','{"core":true,"prereqs":[19],"estimate":30,"note":""}'::jsonb),
(21,'Count primes up to N (Sieve of Eratosthenes)','Basics and numbers',1,'M','{"core":false,"prereqs":[11],"estimate":60,"note":""}'::jsonb),
(22,'Right-angled star triangle','Patterns',1,'E','{"core":true,"prereqs":[1],"estimate":30,"note":""}'::jsonb),
(23,'Inverted star triangle','Patterns',1,'E','{"core":false,"prereqs":[22],"estimate":30,"note":""}'::jsonb),
(24,'Star pyramid','Patterns',1,'E','{"core":false,"prereqs":[22],"estimate":30,"note":""}'::jsonb),
(25,'Floyd’s number triangle','Patterns',1,'E','{"core":false,"prereqs":[22],"estimate":30,"note":""}'::jsonb),
(26,'Diamond pattern','Patterns',1,'M','{"core":false,"prereqs":[24],"estimate":60,"note":""}'::jsonb),
(27,'Pascal’s triangle','Patterns',1,'M','{"core":false,"prereqs":[22],"estimate":60,"note":""}'::jsonb),
(28,'Largest and smallest element','Arrays',1,'E','{"core":true,"prereqs":[1],"estimate":30,"note":""}'::jsonb),
(29,'Second largest element','Arrays',1,'E','{"core":true,"prereqs":[28],"estimate":30,"note":""}'::jsonb),
(30,'Sum and average of array','Arrays',1,'E','{"core":true,"prereqs":[28],"estimate":30,"note":""}'::jsonb),
(31,'Reverse an array','Arrays',1,'E','{"core":true,"prereqs":[28],"estimate":30,"note":""}'::jsonb),
(32,'Count even and odd elements','Arrays',1,'E','{"core":false,"prereqs":[28],"estimate":30,"note":""}'::jsonb),
(33,'Check if array is sorted','Arrays',1,'E','{"core":true,"prereqs":[28],"estimate":30,"note":""}'::jsonb),
(34,'Linear search','Arrays',1,'E','{"core":true,"prereqs":[28],"estimate":30,"note":""}'::jsonb),
(35,'Frequency of each element','Arrays',1,'E','{"core":true,"prereqs":[28],"estimate":30,"note":""}'::jsonb),
(36,'Remove duplicates from sorted array','Arrays',1,'E','{"core":true,"prereqs":[33],"estimate":30,"note":"Sorted array; return the number of unique elements using in-place writes."}'::jsonb),
(37,'Left rotate by one','Arrays',1,'E','{"core":false,"prereqs":[31],"estimate":30,"note":""}'::jsonb),
(38,'Rotate array by K positions','Arrays',1,'M','{"core":true,"prereqs":[31],"estimate":60,"note":""}'::jsonb),
(39,'Move all zeros to end','Arrays',1,'E','{"core":true,"prereqs":[31],"estimate":30,"note":""}'::jsonb),
(40,'Find missing number (1 to N)','Arrays',1,'E','{"core":true,"prereqs":[30],"estimate":30,"note":"Exactly one value is missing from 1..N; input length is N−1."}'::jsonb),
(41,'Find duplicate element','Arrays',1,'E','{"core":true,"prereqs":[35],"estimate":30,"note":"Use a frequency map for the general version; document constraints before using a specialized algorithm."}'::jsonb),
(42,'Leaders in an array','Arrays',1,'E','{"core":false,"prereqs":[28],"estimate":30,"note":""}'::jsonb),
(43,'Sort array of 0s, 1s and 2s','Arrays',1,'M','{"core":true,"prereqs":[31],"estimate":60,"note":""}'::jsonb),
(44,'Union of two sorted arrays','Arrays',1,'E','{"core":false,"prereqs":[36],"estimate":30,"note":""}'::jsonb),
(45,'Intersection of two sorted arrays','Arrays',1,'E','{"core":false,"prereqs":[36],"estimate":30,"note":""}'::jsonb),
(46,'Merge two sorted arrays','Arrays',1,'E','{"core":true,"prereqs":[33],"estimate":30,"note":""}'::jsonb),
(47,'Pair with given sum','Arrays',1,'E','{"core":true,"prereqs":[34],"estimate":30,"note":"Return one valid pair or report no pair; start with brute force."}'::jsonb),
(48,'Maximum product of two elements','Arrays',1,'E','{"core":false,"prereqs":[29],"estimate":30,"note":"Allow negative values: compare the two largest values with the two smallest."}'::jsonb),
(49,'Best time to buy and sell stock (one transaction)','Arrays',1,'M','{"core":true,"prereqs":[28],"estimate":60,"note":"One buy followed by one sell; return 0 if no profit is possible."}'::jsonb),
(50,'Equilibrium index','Arrays',1,'M','{"core":false,"prereqs":[52],"estimate":60,"note":""}'::jsonb),
(51,'Majority element','Arrays',1,'M','{"core":true,"prereqs":[35],"estimate":60,"note":"Verify the candidate occurs more than floor(n/2) times; report none otherwise."}'::jsonb),
(52,'Range sum queries using prefix sum','Arrays',1,'M','{"core":true,"prereqs":[30],"estimate":60,"note":""}'::jsonb),
(53,'Reverse a string','Strings',1,'E','{"core":true,"prereqs":[31],"estimate":30,"note":""}'::jsonb),
(54,'Palindrome string','Strings',1,'E','{"core":true,"prereqs":[53],"estimate":30,"note":""}'::jsonb),
(55,'Count vowels and consonants','Strings',1,'E','{"core":true,"prereqs":[53],"estimate":30,"note":""}'::jsonb),
(56,'Toggle case of characters','Strings',1,'E','{"core":false,"prereqs":[53],"estimate":30,"note":""}'::jsonb),
(57,'Remove spaces from a string','Strings',1,'E','{"core":false,"prereqs":[53],"estimate":30,"note":""}'::jsonb),
(58,'Count words in a sentence','Strings',1,'E','{"core":true,"prereqs":[53],"estimate":30,"note":""}'::jsonb),
(59,'Character frequency','Strings',1,'E','{"core":true,"prereqs":[35,53],"estimate":30,"note":""}'::jsonb),
(60,'Remove vowels','Strings',1,'E','{"core":false,"prereqs":[55],"estimate":30,"note":""}'::jsonb),
(61,'Capitalize first letter of each word','Strings',1,'E','{"core":false,"prereqs":[58],"estimate":30,"note":""}'::jsonb),
(62,'Sum of digits present in a string','Strings',1,'E','{"core":false,"prereqs":[6,53],"estimate":30,"note":""}'::jsonb),
(63,'Remove duplicate characters','Strings',1,'E','{"core":false,"prereqs":[59],"estimate":30,"note":""}'::jsonb),
(64,'First non-repeating character','Strings',1,'E','{"core":true,"prereqs":[59],"estimate":30,"note":""}'::jsonb),
(65,'Anagram check','Strings',1,'E','{"core":true,"prereqs":[59],"estimate":30,"note":""}'::jsonb),
(66,'Pangram check','Strings',1,'E','{"core":false,"prereqs":[59],"estimate":30,"note":""}'::jsonb),
(67,'Reverse words in a sentence','Strings',1,'M','{"core":true,"prereqs":[58,53],"estimate":60,"note":""}'::jsonb),
(68,'Longest word in a sentence','Strings',1,'E','{"core":false,"prereqs":[58],"estimate":30,"note":""}'::jsonb),
(69,'Check if one string is a rotation of another','Strings',1,'M','{"core":false,"prereqs":[53],"estimate":60,"note":""}'::jsonb),
(70,'String compression (aabbb → a2b3)','Strings',1,'M','{"core":true,"prereqs":[59],"estimate":60,"note":"Run-length encode consecutive runs. Define how singletons are represented."}'::jsonb),
(71,'Longest common prefix','Strings',1,'M','{"core":true,"prereqs":[53],"estimate":60,"note":""}'::jsonb),
(72,'Binary search','Searching and sorting',1,'E','{"core":true,"prereqs":[33],"estimate":30,"note":""}'::jsonb),
(73,'First and last occurrence in sorted array','Searching and sorting',1,'M','{"core":true,"prereqs":[72],"estimate":60,"note":""}'::jsonb),
(74,'Count occurrences in sorted array','Searching and sorting',1,'M','{"core":false,"prereqs":[73],"estimate":60,"note":""}'::jsonb),
(75,'Search insert position','Searching and sorting',1,'E','{"core":true,"prereqs":[72],"estimate":30,"note":""}'::jsonb),
(76,'Bubble sort','Searching and sorting',1,'E','{"core":true,"prereqs":[28],"estimate":30,"note":""}'::jsonb),
(77,'Selection sort','Searching and sorting',1,'E','{"core":false,"prereqs":[76],"estimate":30,"note":""}'::jsonb),
(78,'Insertion sort','Searching and sorting',1,'E','{"core":true,"prereqs":[76],"estimate":30,"note":""}'::jsonb),
(79,'Merge sort','Searching and sorting',1,'M','{"core":true,"prereqs":[46,93],"estimate":60,"note":""}'::jsonb),
(80,'Quick sort','Searching and sorting',1,'M','{"core":false,"prereqs":[76,93],"estimate":60,"note":""}'::jsonb),
(81,'Kth smallest element','Searching and sorting',1,'E','{"core":false,"prereqs":[76],"estimate":30,"note":"Treat duplicates as separate ranked entries unless the prompt specifies distinct values."}'::jsonb),
(82,'Sort elements by frequency','Searching and sorting',1,'M','{"core":false,"prereqs":[35,76],"estimate":60,"note":""}'::jsonb),
(83,'Square root using binary search','Searching and sorting',1,'M','{"core":true,"prereqs":[72],"estimate":60,"note":"Return floor(sqrt(n)) for non-negative integers."}'::jsonb),
(84,'Matrix addition','Matrices',1,'E','{"core":true,"prereqs":[28],"estimate":30,"note":""}'::jsonb),
(85,'Matrix multiplication','Matrices',1,'E','{"core":false,"prereqs":[84],"estimate":30,"note":""}'::jsonb),
(86,'Transpose of a matrix','Matrices',1,'E','{"core":true,"prereqs":[84],"estimate":30,"note":""}'::jsonb),
(87,'Row-wise and column-wise sum','Matrices',1,'E','{"core":false,"prereqs":[84],"estimate":30,"note":""}'::jsonb),
(88,'Diagonal sums','Matrices',1,'E','{"core":true,"prereqs":[84],"estimate":30,"note":""}'::jsonb),
(89,'Symmetric matrix check','Matrices',1,'E','{"core":false,"prereqs":[86],"estimate":30,"note":""}'::jsonb),
(90,'Spiral traversal','Matrices',1,'M','{"core":true,"prereqs":[84],"estimate":60,"note":""}'::jsonb),
(91,'Rotate matrix by 90°','Matrices',1,'M','{"core":true,"prereqs":[86],"estimate":60,"note":"Use a square matrix for the in-place variant."}'::jsonb),
(92,'Search in row- and column-sorted matrix','Matrices',1,'M','{"core":false,"prereqs":[72,84],"estimate":60,"note":""}'::jsonb),
(93,'Print 1 to N using recursion','Basic recursion',1,'E','{"core":true,"prereqs":[1],"estimate":30,"note":""}'::jsonb),
(94,'Factorial using recursion','Basic recursion',1,'E','{"core":true,"prereqs":[93,9],"estimate":30,"note":""}'::jsonb),
(95,'Nth Fibonacci using recursion','Basic recursion',1,'E','{"core":false,"prereqs":[93,10],"estimate":30,"note":""}'::jsonb),
(96,'Sum of array using recursion','Basic recursion',1,'E','{"core":true,"prereqs":[93,30],"estimate":30,"note":""}'::jsonb),
(97,'Reverse a string using recursion','Basic recursion',1,'E','{"core":false,"prereqs":[93,53],"estimate":30,"note":""}'::jsonb),
(98,'Palindrome check using recursion','Basic recursion',1,'E','{"core":false,"prereqs":[93,54],"estimate":30,"note":""}'::jsonb),
(99,'Fast power x^n','Basic recursion',1,'M','{"core":true,"prereqs":[93,18],"estimate":60,"note":""}'::jsonb),
(100,'Tower of Hanoi','Basic recursion',1,'M','{"core":false,"prereqs":[93],"estimate":60,"note":""}'::jsonb),
(101,'Count distinct elements','Hashing',2,'E','{"core":true,"prereqs":[35],"estimate":30,"note":""}'::jsonb),
(102,'First repeating element','Hashing',2,'E','{"core":false,"prereqs":[35],"estimate":30,"note":""}'::jsonb),
(103,'Two sum (unsorted array)','Hashing',2,'E','{"core":true,"prereqs":[101,47],"estimate":30,"note":""}'::jsonb),
(104,'Count pairs with given sum','Hashing',2,'M','{"core":false,"prereqs":[103],"estimate":60,"note":""}'::jsonb),
(105,'Subarray with zero sum','Hashing',2,'M','{"core":true,"prereqs":[52,101],"estimate":60,"note":""}'::jsonb),
(106,'Subarray sum equals K','Hashing',2,'M','{"core":true,"prereqs":[105],"estimate":60,"note":""}'::jsonb),
(107,'Longest consecutive sequence','Hashing',2,'M','{"core":false,"prereqs":[101],"estimate":60,"note":""}'::jsonb),
(108,'Group anagrams','Hashing',2,'M','{"core":false,"prereqs":[65,101],"estimate":60,"note":""}'::jsonb),
(109,'Pair sum in sorted array','Two pointers and sliding window',2,'E','{"core":true,"prereqs":[47,33],"estimate":30,"note":""}'::jsonb),
(110,'Remove duplicates in place','Two pointers and sliding window',2,'E','{"core":false,"prereqs":[36],"estimate":30,"note":"Revisit #36 as the in-place two-pointer variant; it is deliberately lower priority in short tracks."}'::jsonb),
(111,'Maximum sum subarray of size K','Two pointers and sliding window',2,'E','{"core":true,"prereqs":[30],"estimate":30,"note":""}'::jsonb),
(112,'Three sum','Two pointers and sliding window',2,'M','{"core":false,"prereqs":[109,76],"estimate":60,"note":""}'::jsonb),
(113,'Container with most water','Two pointers and sliding window',2,'M','{"core":false,"prereqs":[109],"estimate":60,"note":""}'::jsonb),
(114,'First negative number in every window of size K','Two pointers and sliding window',2,'M','{"core":false,"prereqs":[111],"estimate":60,"note":""}'::jsonb),
(115,'Longest subarray with sum K (positive numbers)','Two pointers and sliding window',2,'M','{"core":true,"prereqs":[111],"estimate":60,"note":"The sliding-window version assumes positive numbers. Do not apply it unchanged to negative values."}'::jsonb),
(116,'Smallest subarray with sum ≥ S','Two pointers and sliding window',2,'M','{"core":false,"prereqs":[115],"estimate":60,"note":"Use positive values for this sliding-window variant."}'::jsonb),
(117,'Longest substring without repeating characters','Two pointers and sliding window',2,'M','{"core":true,"prereqs":[59,111],"estimate":60,"note":""}'::jsonb),
(118,'Count occurrences of anagrams','Two pointers and sliding window',2,'M','{"core":false,"prereqs":[65,111],"estimate":60,"note":""}'::jsonb),
(119,'Maximum subarray sum','Kadane’s algorithm',2,'M','{"core":true,"prereqs":[30],"estimate":60,"note":""}'::jsonb),
(120,'Maximum product subarray','Kadane’s algorithm',2,'M','{"core":false,"prereqs":[119],"estimate":60,"note":""}'::jsonb),
(121,'Maximum circular subarray sum','Kadane’s algorithm',2,'M','{"core":false,"prereqs":[119],"estimate":60,"note":""}'::jsonb),
(122,'Implement stack using array','Stack and queue',2,'E','{"core":true,"prereqs":[28],"estimate":30,"note":""}'::jsonb),
(123,'Balanced parentheses','Stack and queue',2,'E','{"core":true,"prereqs":[122],"estimate":30,"note":""}'::jsonb),
(124,'Reverse a string using stack','Stack and queue',2,'E','{"core":false,"prereqs":[122,53],"estimate":30,"note":""}'::jsonb),
(125,'Evaluate postfix expression','Stack and queue',2,'E','{"core":false,"prereqs":[122],"estimate":30,"note":""}'::jsonb),
(126,'Implement queue using two stacks','Stack and queue',2,'M','{"core":false,"prereqs":[122],"estimate":60,"note":""}'::jsonb),
(127,'Next greater element','Stack and queue',2,'M','{"core":true,"prereqs":[122],"estimate":60,"note":""}'::jsonb),
(128,'Stock span problem','Stack and queue',2,'M','{"core":false,"prereqs":[127],"estimate":60,"note":""}'::jsonb),
(129,'Infix to postfix','Stack and queue',2,'M','{"core":false,"prereqs":[125],"estimate":60,"note":""}'::jsonb),
(130,'Min stack','Stack and queue',2,'M','{"core":false,"prereqs":[122],"estimate":60,"note":""}'::jsonb),
(131,'Largest rectangle in histogram','Stack and queue',2,'H','{"core":false,"prereqs":[127],"estimate":90,"note":""}'::jsonb),
(132,'Create, traverse, insert and delete nodes','Linked list',2,'E','{"core":true,"prereqs":[1],"estimate":90,"note":"Implement creation, traversal, insertion and deletion. The estimate includes all four operations."}'::jsonb),
(133,'Length of linked list','Linked list',2,'E','{"core":false,"prereqs":[132],"estimate":30,"note":""}'::jsonb),
(134,'Search an element','Linked list',2,'E','{"core":false,"prereqs":[132],"estimate":30,"note":""}'::jsonb),
(135,'Middle of linked list','Linked list',2,'E','{"core":true,"prereqs":[132],"estimate":30,"note":""}'::jsonb),
(136,'Remove duplicates from sorted list','Linked list',2,'E','{"core":false,"prereqs":[132,36],"estimate":30,"note":""}'::jsonb),
(137,'Reverse a linked list','Linked list',2,'M','{"core":true,"prereqs":[132],"estimate":60,"note":""}'::jsonb),
(138,'Detect loop','Linked list',2,'M','{"core":true,"prereqs":[135],"estimate":60,"note":""}'::jsonb),
(139,'Merge two sorted lists','Linked list',2,'M','{"core":false,"prereqs":[137,46],"estimate":60,"note":""}'::jsonb),
(140,'Remove Nth node from end','Linked list',2,'M','{"core":false,"prereqs":[135],"estimate":60,"note":""}'::jsonb),
(141,'Palindrome linked list','Linked list',2,'M','{"core":false,"prereqs":[135,137],"estimate":60,"note":""}'::jsonb),
(142,'Intersection point of two lists','Linked list',2,'M','{"core":false,"prereqs":[132],"estimate":60,"note":"Intersection means the same node identity, not merely equal node values."}'::jsonb),
(143,'Check odd or even using bits','Bit manipulation',2,'E','{"core":false,"prereqs":[1],"estimate":30,"note":""}'::jsonb),
(144,'Check if Kth bit is set','Bit manipulation',2,'E','{"core":false,"prereqs":[19],"estimate":30,"note":""}'::jsonb),
(145,'Count set bits','Bit manipulation',2,'E','{"core":true,"prereqs":[144],"estimate":30,"note":""}'::jsonb),
(146,'Power of two check','Bit manipulation',2,'E','{"core":true,"prereqs":[145],"estimate":30,"note":""}'::jsonb),
(147,'Swap two numbers without a temp variable','Bit manipulation',2,'E','{"core":false,"prereqs":[144],"estimate":30,"note":"Use XOR on integers; prefer normal swapping in application code."}'::jsonb),
(148,'Find the single non-repeating number (XOR)','Bit manipulation',2,'E','{"core":true,"prereqs":[144],"estimate":30,"note":""}'::jsonb),
(149,'Find missing number using XOR','Bit manipulation',2,'E','{"core":false,"prereqs":[148,40],"estimate":30,"note":""}'::jsonb),
(150,'Minimum coins (Indian currency denominations)','Greedy',2,'E','{"core":false,"prereqs":[1],"estimate":30,"note":"Use a specified standard denomination set. Greedy is not correct for every possible coin system."}'::jsonb),
(151,'Activity selection / N meetings in one room','Greedy',2,'E','{"core":true,"prereqs":[76],"estimate":30,"note":""}'::jsonb),
(152,'Minimum platforms','Greedy',2,'M','{"core":false,"prereqs":[151],"estimate":60,"note":""}'::jsonb),
(153,'Fractional knapsack','Greedy',2,'M','{"core":false,"prereqs":[151],"estimate":60,"note":""}'::jsonb),
(154,'Job sequencing with deadlines','Greedy',2,'M','{"core":false,"prereqs":[151],"estimate":60,"note":""}'::jsonb),
(155,'Search in rotated sorted array','Binary search variations',3,'M','{"core":false,"prereqs":[72],"estimate":60,"note":"This is a binary search variation, not binary search on the answer."}'::jsonb),
(156,'Find peak element','Binary search variations',3,'M','{"core":false,"prereqs":[72],"estimate":60,"note":"This is a binary search variation, not binary search on the answer."}'::jsonb),
(157,'Minimum eating speed (Koko bananas)','Binary search variations',3,'M','{"core":false,"prereqs":[72],"estimate":60,"note":""}'::jsonb),
(158,'Book allocation','Binary search variations',3,'H','{"core":false,"prereqs":[157],"estimate":90,"note":""}'::jsonb),
(159,'Aggressive cows','Binary search variations',3,'H','{"core":false,"prereqs":[157,76],"estimate":90,"note":""}'::jsonb),
(160,'Generate all subsets','Backtracking',3,'M','{"core":false,"prereqs":[93],"estimate":60,"note":""}'::jsonb),
(161,'Permutations of a string','Backtracking',3,'M','{"core":false,"prereqs":[160,53],"estimate":60,"note":""}'::jsonb),
(162,'Generate balanced parentheses','Backtracking',3,'M','{"core":false,"prereqs":[160,123],"estimate":60,"note":""}'::jsonb),
(163,'Combination sum','Backtracking',3,'M','{"core":false,"prereqs":[160],"estimate":60,"note":""}'::jsonb),
(164,'Rat in a maze','Backtracking',3,'M','{"core":false,"prereqs":[160,84],"estimate":60,"note":""}'::jsonb),
(165,'N-Queens','Backtracking',3,'H','{"core":false,"prereqs":[160],"estimate":90,"note":""}'::jsonb),
(166,'Inorder, preorder and postorder traversal','Trees and BST',3,'E','{"core":false,"prereqs":[93],"estimate":30,"note":""}'::jsonb),
(167,'Height of binary tree','Trees and BST',3,'E','{"core":false,"prereqs":[166],"estimate":30,"note":""}'::jsonb),
(168,'Count nodes and leaf nodes','Trees and BST',3,'E','{"core":false,"prereqs":[166],"estimate":30,"note":""}'::jsonb),
(169,'Check if two trees are identical','Trees and BST',3,'E','{"core":false,"prereqs":[166],"estimate":30,"note":""}'::jsonb),
(170,'Mirror of a tree','Trees and BST',3,'E','{"core":false,"prereqs":[166],"estimate":30,"note":""}'::jsonb),
(171,'Level order traversal','Trees and BST',3,'M','{"core":false,"prereqs":[166,126],"estimate":60,"note":""}'::jsonb),
(172,'Left view of binary tree','Trees and BST',3,'M','{"core":false,"prereqs":[171],"estimate":60,"note":""}'::jsonb),
(173,'Diameter of binary tree','Trees and BST',3,'M','{"core":false,"prereqs":[167],"estimate":60,"note":""}'::jsonb),
(174,'Lowest common ancestor','Trees and BST',3,'M','{"core":false,"prereqs":[166],"estimate":60,"note":"Use the general binary-tree version and assume both nodes exist."}'::jsonb),
(175,'BST insert and search','Trees and BST',3,'E','{"core":false,"prereqs":[166,72],"estimate":30,"note":""}'::jsonb),
(176,'Validate BST','Trees and BST',3,'M','{"core":false,"prereqs":[175],"estimate":60,"note":""}'::jsonb),
(177,'Kth smallest in BST','Trees and BST',3,'M','{"core":false,"prereqs":[175],"estimate":60,"note":""}'::jsonb),
(178,'Climbing stairs','Dynamic programming',3,'E','{"core":false,"prereqs":[93],"estimate":30,"note":""}'::jsonb),
(179,'Fibonacci with memoization','Dynamic programming',3,'E','{"core":false,"prereqs":[95],"estimate":30,"note":""}'::jsonb),
(180,'House robber','Dynamic programming',3,'M','{"core":false,"prereqs":[178],"estimate":60,"note":""}'::jsonb),
(181,'Unique paths in grid','Dynamic programming',3,'M','{"core":false,"prereqs":[178,84],"estimate":60,"note":""}'::jsonb),
(182,'Minimum path sum in grid','Dynamic programming',3,'M','{"core":false,"prereqs":[181],"estimate":60,"note":""}'::jsonb),
(183,'Coin change: number of ways','Dynamic programming',3,'M','{"core":false,"prereqs":[178],"estimate":60,"note":"Count combinations, not different orderings of the same coins."}'::jsonb),
(184,'Coin change: minimum coins','Dynamic programming',3,'M','{"core":false,"prereqs":[183],"estimate":60,"note":""}'::jsonb),
(185,'0/1 knapsack','Dynamic programming',3,'M','{"core":false,"prereqs":[178],"estimate":60,"note":""}'::jsonb),
(186,'Longest common subsequence','Dynamic programming',3,'M','{"core":false,"prereqs":[178,53],"estimate":60,"note":""}'::jsonb),
(187,'Longest increasing subsequence','Dynamic programming',3,'M','{"core":false,"prereqs":[178,28],"estimate":60,"note":""}'::jsonb),
(188,'Partition equal subset sum','Dynamic programming',3,'M','{"core":false,"prereqs":[185],"estimate":60,"note":""}'::jsonb),
(189,'Edit distance','Dynamic programming',3,'H','{"core":false,"prereqs":[186],"estimate":90,"note":""}'::jsonb),
(190,'BFS traversal','Graphs',3,'E','{"core":false,"prereqs":[126,28],"estimate":30,"note":"Use an adjacency list; visit disconnected components if full graph traversal is required."}'::jsonb),
(191,'DFS traversal','Graphs',3,'E','{"core":false,"prereqs":[93,28],"estimate":30,"note":"Use an adjacency list; include a visited set."}'::jsonb),
(192,'Number of islands','Graphs',3,'M','{"core":false,"prereqs":[190,84],"estimate":60,"note":""}'::jsonb),
(193,'Detect cycle in undirected graph','Graphs',3,'M','{"core":false,"prereqs":[191],"estimate":60,"note":""}'::jsonb),
(194,'Shortest path in unweighted graph','Graphs',3,'M','{"core":false,"prereqs":[190],"estimate":60,"note":""}'::jsonb),
(195,'Rotten oranges','Graphs',3,'M','{"core":false,"prereqs":[190,84],"estimate":60,"note":""}'::jsonb),
(196,'Topological sort','Graphs',3,'M','{"core":false,"prereqs":[191],"estimate":60,"note":"Topological ordering is defined for a DAG. Detect and report a cycle."}'::jsonb)
on conflict(problem_id) do nothing;
commit;
