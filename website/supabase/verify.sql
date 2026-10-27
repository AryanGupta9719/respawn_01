-- Run AFTER the migration. Expected: 196 rows; RLS=true on all five tables.
select count(*) as problem_count from public.preparc_problem_bank;
select tablename,rowsecurity from pg_tables where schemaname='public' and tablename like 'preparc_%';
select routine_name,grantee,privilege_type from information_schema.routine_privileges where routine_schema='public' and routine_name in ('save_preparc_state','consume_ai_quota') order by routine_name,grantee;
-- The SQL Editor runs as an elevated DB role: successful reads there do NOT test RLS.
-- Use two signed-in test accounts through the app/API to verify data isolation.
