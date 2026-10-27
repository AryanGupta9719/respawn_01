// Original short exercises; draft learning content, not a complete reviewed course.
const EXTRA_BANK=[
['sql-1','SQL','SELECT, without the noise',10,'learn','Given students(name, marks), write a query returning names with marks above 75. Then sort them by marks descending. Expected structure: SELECT name FROM students WHERE marks > 75 ORDER BY marks DESC.'],
['sql-2','SQL','Count each group',15,'practice','Using students(name, branch), write a query counting students per branch. Explain why GROUP BY is required.'],
['sql-3','SQL','INNER JOIN, on paper',15,'learn','Given students(id,name) and scores(student_id,marks), join them to show name and marks. Describe what happens when a student has no score.'],
['sql-4','SQL','WHERE or HAVING?',10,'revise','Explain whether filtering individual rows by marks and filtering branch averages happen before or after GROUP BY. Write one WHERE and one HAVING example.'],
['sql-5','SQL','NULL is not zero',10,'learn','Explain why WHERE score = NULL is incorrect. Write IS NULL and IS NOT NULL examples. Explain COUNT(*) versus COUNT(score).'],
['apt-1','Aptitude','A percentage warm-up',10,'practice','An item costs ₹800. Increase by 25%, then discount by 20%. What is the final price? Work it out before checking: ₹800.'],
['apt-2','Aptitude','A ratio in three steps',10,'practice','Split ₹600 in the ratio 2:3:5. Write the total parts and each share. Check: ₹120, ₹180, ₹300.'],
['apt-3','Aptitude','Average, then one more',10,'practice','Five values average 18. Add a sixth value of 30. Find the new average. Check: 20.'],
['apt-4','Aptitude','Work together',15,'practice','A completes a job in 6 days; B in 3. Add their daily work rates. Together they take 2 days. Explain the calculation.'],
['os-1','Operating systems','Process or thread?',10,'learn','Write two differences between a process and a thread. Include address-space sharing and what a context switch changes.'],
['os-2','Operating systems','Four conditions for deadlock',15,'learn','List mutual exclusion, hold and wait, no preemption, and circular wait. Construct a two-resource example.'],
['os-3','Operating systems','Paging, from memory',10,'revise','Explain page, frame, page table and page fault. Say which parts of your explanation need checking against notes.'],
['db-1','DBMS','Keys, with an example',10,'learn','Create a small students/courses schema. Identify a primary key, candidate key, and foreign key. Explain uniqueness and referential integrity.'],
['db-2','DBMS','ACID in one transaction',15,'learn','Use a bank transfer example to explain atomicity, consistency, isolation and durability. Avoid equating consistency with eventual consistency.'],
['db-3','DBMS','Normalisation recall',10,'revise','Explain partial and transitive dependency using a small example. Distinguish 2NF and 3NF.'],
['oop-1','OOP','Encapsulation, in practice',10,'learn','Sketch a BankAccount class with a private balance and deposit/withdraw methods. Explain which invariant the methods protect.'],
['oop-2','OOP','Overload or override?',10,'revise','Write or describe one example of each in your preferred language. State whether that language actually supports method overloading.'],
['cn-1','Computer networks','TCP versus UDP',10,'learn','Compare delivery guarantees, ordering, connection setup and common uses. Do not claim UDP always has lower application latency.'],
['cn-2','Computer networks','A request leaves your browser',15,'learn','Outline DNS resolution, connection setup and an HTTP request. Mention that cached results or existing connections may skip steps.']
].map(([id,topic,title,minutes,type,desc])=>({id:'extra-'+id,topic,title,minutes,type,desc,kind:'small',reviewStatus:'pending_review'}));
