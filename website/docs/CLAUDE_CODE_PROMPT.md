# Paste this entire prompt into Claude Code on my Mac

You are my senior full-stack engineer, product designer and testing partner. Work on the actual local files and complete the job; do not give me another generic architecture proposal.

## Goal and identity

Build on the supplied runnable codebase to make **Respawn** work on my Mac with my existing Supabase project. Keep the name **Respawn** everywhere. Keep the current warm cream/sage design and original Kapi capybara. I want this same website completed and connected, not an unrelated template.

My GitHub repository is:
https://github.com/AryanGupta9719/respawn.git

I authorise normal local implementation, dependency installation, tests, commits and pushing the completed code to that repository. Do not publish a live site or change repository visibility. Do not force-push or overwrite unrelated work. Secrets must never enter commits.

## The supplied files

This is the Respawn repository root. Read README.md and CLAUDE.md here.

Read:
1. README.md
2. CLAUDE.md
3. docs/PRODUCT_CONTEXT.md
4. docs/VERIFICATION.md
5. package.json
6. .env.example
7. supabase/migrations/202610250001_preparc.sql
8. The actual UI, problem bank, planner, server and enhanced UI files.

The sibling current-preview folder is the untouched original static website, supplied as a visual reference and backup. The preparc folder is the newer runnable app. Work from preparc; do not accidentally replace it with the old preview.

If files have not been downloaded or extracted yet, tell me the one missing local step. Do not invent source code you claim to have read.

## Local folder and Git workflow

1. Inspect the current directory and applicable AGENTS.md/CLAUDE.md instructions. Check existing files, git status, remotes and branches.
2. Use a normal Mac project folder such as ~/Documents/Projects/respawn, unless I opened an existing checkout. Do not pretend files are stored “inside the Claude app”: create an actual folder on my Mac and report its absolute path.
3. If a matching checkout exists, reuse it. Otherwise clone my GitHub repo. If GitHub authentication is required, use the normal local authenticated workflow; never ask me to paste a GitHub token into chat.
4. Copy the runnable app into the repository root, keeping the source archive outside the repo if possible. Preserve existing unrelated work. If README-only history exists, integrate it normally rather than creating unrelated history.
5. Do not blindly run git init, git remote add origin or echo into README repeatedly. Inspect before changing.
6. Keep package-lock.json tracked. Exclude .env.local, all secret env files, node_modules, dist, cookies, personal test data and logs.
7. Run checks and inspect the staged diff before committing. Use a clear commit message. Push normally to main when the existing repository workflow permits it; if main is protected, push a review branch and report that accurately. No force-push, hard reset or destructive history rewrite.

## Current stack: preserve it unless a concrete blocker requires change

The runnable app uses Vite, plain JavaScript with the existing classic-script UI, a small Node HTTP server, Supabase Auth/PostgreSQL and an optional Anthropic API endpoint. It is not a Next.js app. Do not migrate the whole project merely because you prefer a framework.

The layout is:
- public/app.js: original UI shell, SVG Kapi, calendar and interactions.
- public/dsa-bank.js: exact 196 numbered problems.
- public/dsa-planner.js: pure deterministic selector/scheduler.
- public/dsa-ui.js: DSA screens and problem bank.
- public/extra-curriculum.js: small original other-subject starter exercises.
- public/enhanced.js: gradual onboarding, flexible dates, Supabase saving, short-day choices and AI request controls.
- public/style.css: existing tokens and responsive theme.
- src/main.js: Supabase client bootstrap and ordered script loading.
- server.mjs: local/prod serving and protected AI endpoint.
- supabase/migrations/: additive SQL.

Refactor duplicated or superseded functions only when necessary for correctness and maintainability, keeping the visible design and functionality. Avoid a wholesale rewrite before validating what already works.

## Product context

Respawn is a preparation companion for Indian college students targeting entry-level software developer jobs. It answers “what should I do today?” based on actual available time, current knowledge, campus hiring expectations and goals. It should build confidence through useful work and honest feedback, not fake progress or employment promises.

### Latest requirements override old ones

- AI-assisted planning is now allowed. The old “no AI” restriction is retired.
- No fixed 2-, 3-, 4-, 5- or 6-month tracks.
- Ask roughly when companies start coming to campus, using a month or estimate. An exact placement date is not compulsory.
- Ask target companies/roles optionally, with “not decided” allowed.
- Unknown hiring dates use an explicitly provisional short rolling plan, initially 14 days.
- The first onboarding questions should be light and friendly. Give an early small task, then collect detailed levels and availability gradually. Skipping the warm-up must work.
- Preparation includes DSA, SQL, aptitude and useful core-CS topics.
- Revision is a real scheduled activity, not extra work silently added to full days.
- Short days should offer a suitable short task or day off.
- ₹700 advanced rescheduling is a future monetisation proposal, disabled for now. No billing interval has been chosen.

### DSA bank and selection

Preserve all 196 IDs and titles. Tiers and M/H markers come from the supplied bank; unmarked E estimates and durations are assumptions, not empirical measurements. Do not invent company-frequency data.

The planner must not run questions 1..196 in order until time runs out. Short windows need representative coverage of arrays, strings, search/sort, hashing, windows and other appropriate patterns before every repetitive number/pattern exercise. More available time allows variations and advanced questions. Include prerequisites. Respect current knowledge, completed work and whole-session requirements.

Included, deferred, completed and needs-retry are different states. A deferred question may be muted/struck through only with a clear Deferred label and explanation. Never silently delete it or mark it solved. Pin/Defer/Restore controls must preview actual changes. A pinned task that cannot fit must produce an explicit conflict.

### AI responsibilities and boundaries

The provided endpoint currently suggests DSA priority IDs within coverage groups; it does not yet generate arbitrary full multi-subject schedules. Be honest about this.

Keep AI constrained to approved task IDs and a validated schema. Dates, daily capacity, prerequisites, reserved buffer, revisions and completed work are enforced by deterministic code. Reject malformed, duplicate or unknown IDs. Missing keys, provider errors and rate limits must leave the rule-based planner usable and the existing plan intact.

AI suggestions should run only after an explicit action or meaningful plan event, not every login or checkbox. Never expose the API key to browser code. The server must authenticate the user before a provider call and enforce the persistent per-user quota. Do not promise that a Claude Code subscription automatically supplies API access for this website.

If you extend AI support to other subjects, give those tasks stable approved IDs and include them in validation. Do not treat model text as executable code or trusted instructions. Do not invent external links or company-specific facts.

### Revision

Use active recall and independent retries, plus mistakes and mixed practice. Intervals around 1/3/7/14 days are a configurable starting idea, not a rigid promise. Success can widen spacing; needing help should trigger earlier independent retry; repeated difficulty can trigger a prerequisite refresher. Revision consumes real time. Count unique solved questions separately from reviews. Preserve attempts even when tasks leave the active schedule.

### Short days

If a student has 10–20 minutes, prefer a fitting due review or a suitable small SQL/aptitude/OS/DBMS/OOP/CN task. These subjects are not inherently easier: choose a bounded objective appropriate to their level. Never replace a 90-minute problem with a fake “done” checkbox. Displaced work must remain visible for adjustment. A day off should be allowed. Repeated short days should prompt a realistic availability/scope adjustment.

Audit and improve short-day behaviour: preserve actual scheduled/original dates rather than fabricating missed dates; keep a clear recovery queue; prevent duplicate short tasks; ensure rescheduling respects the new dates of prerequisites and retained review tasks. Include meaningful tests for this flow.

### Feasibility and recovery

Calculate available study time from actual dates and study days. Reserve catch-up capacity; the current planner uses 15% as an adjustable assumption. Include concept refreshers, practice and later reviews within the limit. Do not claim a total-hour match guarantees session fit.

Be direct about impossible timelines with numbers and exclusions. Previously prepared students can get revision; beginners need genuine foundational learning. Never tell a student their future is hopeless. More time, more calendar room or reduced scope are choices, not silent changes. A paid feature cannot fix an impossible deadline.

Preserve completed work and attempt history. Use catch-up/free capacity before broad reshuffling when practical. Preview moved, added and deferred tasks. More capacity should make deferred work eligible again. Do not regenerate the plan on every login.

### Design and engagement

Keep Respawn, cream/sage/lavender/peach, Fraunces + Inter, soft cards, quiet spacing, Kapi SVG states, night mode, reduced motion, Less banter and mobile navigation. No neon/gamer dashboard, alarm countdowns, fake testimonials, shame, manipulative streaks or unemployment jokes. Keep buttons plain. Aim for trust, early achievable wins and easy return after absence.

## Supabase setup

I already created a Supabase project. Do not create another or ask me to start over.

The complete initial SQL is supplied at supabase/migrations/202610250001_preparc.sql. Ask me to paste that file's entire contents into the SQL Editor and Run if it is not already applied. Give the exact filename and setup sequence. Do not ask me to assemble separate fragments or remove RLS to fix an error.

The schema uses one versioned workspace document plus immutable plan snapshots, save-id idempotency, AI quota and canonical catalog data. This is intentional for a small MVP. Do not add normalized tables and then falsely claim the frontend writes them.

If schema changes are needed after the initial migration has run, add a NEW numbered migration; do not destroy tables or alter the already-applied file invisibly. Ensure migrations are additive/rerunnable where appropriate. Cross-user private data must be inaccessible. Content edits and quotas are not writable by normal clients.

Cloud saves use optimistic concurrency. Test that a stale tab cannot overwrite a newer device's plan. If a conflict appears, show a recoverable resolution and preserve a local backup. Never silently merge two students' accounts.

## Environment variables and secrets

Use the provided .env.example. Create .env.local only if it is absent; do not overwrite my existing values. I will fill in real credentials locally.

Required for cloud features:
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
SUPABASE_URL
SUPABASE_PUBLISHABLE_KEY
APP_URL=http://localhost:3000
PORT=3000

Optional for live AI:
ANTHROPIC_API_KEY
ANTHROPIC_MODEL

Only public Supabase URL/publishable-or-anon key can be VITE_ values. No service_role/secret key is needed by this app. ANTHROPIC_API_KEY must remain server-only. Do not print, copy into screenshots, commit or ask me to paste real secrets into chat. Check presence by variable name only.

Use a model ID actually available in my API account. Do not guess a future model name. Document that API usage may have separate billing. Keep guest/fallback mode working when optional values are absent.

Configure Supabase email/password and localhost redirect URLs. Test confirmation and password recovery through the normal user-controlled flow, not by disabling verification for public launch.

## Future pricing

Do not activate live payments. ₹700 is a proposed advanced-rescheduling price, with undecided validity/access terms. Do not assume monthly, lifetime, per-reschedule or subscription. Keep feature flags and policy transparent. Do not surprise users with a paywall after they fall behind. No fake successful payment buttons or fabricated entitlements.

## Implementation and verification order

1. Inspect/read the supplied source and current Git state.
2. Set up the local repo without losing existing work.
3. Verify Node version; use npm ci from the lockfile.
4. Run baseline tests and the app. Read existing failures before changing code.
5. Audit progressive onboarding, campus estimate and targets, multi-subject allocation, revision, light days, pin/defer and recovery. Fix concrete failures; remove user-visible fixed-month remnants.
6. Confirm env file and SQL migration steps. Continue non-secret-dependent work while I fill credentials.
7. Test real Supabase sign-up/confirmation, sign-in, recovery, save/reload, two devices, two users, sign-out and stale-save conflict when configured.
8. Test live AI success, invalid output, missing key, provider error, quota and fallback when configured. Use mocks for failure modes that should not incur repeated charges.
9. Test short daily limits, unknown date, past estimated month, impossible window, missed days, completed prerequisites, review carry-over and expanded capacity.
10. Check mobile layout and keyboard/focus behaviour. Keep source and screenshot visual references consistent.
11. Run npm test and npm run build. Test the built Node-server app as well as dev mode. A static dist upload alone cannot serve /api endpoints.
12. Inspect staged changes and ensure no secrets are tracked. Commit and push normally to my repo.
13. Leave a concise summary with the absolute project path, start command, Git commit/branch/push result, exact Supabase SQL filename and any genuine remaining integration blocker.

Do not report success for untested real services. The package already passed local scheduler/server/build checks and a local PostgreSQL-compatible migration fixture, but my hosted Supabase and real AI key were not connected in that environment. Finish those checks here when credentials are ready.

## What not to do

Do not rename Respawn, replace its theme with a generic template, throw away the current UI, fabricate resource URLs or testimonials, promise placement, remove RLS, expose API keys, create a new Supabase project, force-push, or stop after producing another plan. Work on the code and deliver a running app.

Proceed now with local inspection and implementation. Ask me only for a genuinely blocking external action, after completing the independent work you can do.
