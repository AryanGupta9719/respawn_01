# Continue Respawn — complete project handoff

You are my senior full-stack engineer and product designer. Continue my existing working website, **Respawn**, using the attached source archive. Do not build a generic replacement or discard existing work. Read this whole prompt, START_HERE.md, the source files and LATEST_MVP_BRIEF.txt before editing.

## What I am giving you

The archive contains the working Vite/JavaScript app, its original Kapi SVG mascot, all 196 DSA questions, 200 official external resource links, planner, tests, optional Supabase integration, SQL migration and environment example. It includes a prebuilt dist folder for preview, complete Git history as Respawn.bundle, and pending product-planning documents. Treat documentation as a mix of implemented prototype features and future requirements; inspect the code to distinguish them.

The current name is **Respawn** everywhere visible. GitHub is https://github.com/AryanGupta9719/respawn. Do not use PrepArc as branding. Existing preparc_* SQL names and browser storage keys are compatibility identifiers; do not rename them blindly or erase saved student work.

## Product purpose

Respawn is a calm placement-preparation companion for Indian college students. It helps students choose manageable daily work, revise, and return after missed days. It links to problems on original platforms instead of hosting copied problem statements, videos or solutions. Its promise: “Fell behind on placement prep? You're not starting over. Respawn rebuilds a realistic plan from today, using the sheet you already follow.”

No placement guarantees, fabricated company-frequency claims, readiness scores, guilt, or fake completion. Respect prerequisites, the student's available minutes, revision and catch-up space. Deferred work remains visible and can be brought back.

## Current implementation to preserve

- Cream/sage/lavender/peach study-room theme, serif headings, rounded cards and responsive navigation.
- Kapi, original SVG capybara with backpack/yuzu, supportive messages and animation states.
- Landing, onboarding, Today, calendar, problem bank, adjustment, progress, settings, account and component states.
- The exact 196 IDs, titles, tier labels, difficulty tags, prerequisites and planning estimates in public/dsa-bank.js.
- Public/problem-links.js adds **200 HTTPS links covering all 196 entries**: 176 practice links and 24 clearly labelled references. Combined exercises have multiple labelled links. Platform constraints/variants have notes. Links appear in the bank, task rows and task dialog, including for saved tasks. Opening a link must never mark a task complete.
- Heuristic DSA selection based on capacity, prerequisites and pattern coverage. Longer windows include more problems; no fixed question count per duration. Concept sessions, problem practice, reviews, protected catch-up capacity, Pin/Defer/Restore and plan previews.
- Completed work and attempts preserved during replanning. Self-reported independent/help/failure/partial outcomes.
- Browser persistence, JSON backup download and restore, dark mode, Less banter, reduced motion and optional generated rain.
- Flexible campus-start estimate/unknown rolling window and progressive onboarding in enhanced.js.
- Optional Supabase cloud save/auth and stale-version checks; actual credentials not included.
- Existing optional Anthropic priority endpoint and short non-DSA curriculum are prototype legacy features, not the latest MVP direction.

## Latest agreed direction supersedes old product documents

Read LATEST_MVP_BRIEF.txt in full. It supersedes docs/PRODUCT_CONTEXT.md, old Claude prompts and prototype assumptions wherever they conflict. The current archive is the working prototype, not a finished implementation of that brief. docs/MVP_V1_PROPOSAL.md and ASSUMPTIONS.md are planning drafts; do not present them as shipped features.

Latest MVP: NO AI/LLM chatbot or generated plans, NO payment/paywall or ₹700 fee, recovery remains free, DSA sheet planning only, NO SQL/aptitude/OS/DBMS/CN content or company-specific plans, no leaderboards/readiness scores. Older conversations briefly explored those features; that is obsolete scope. Do not replace Anthropic with Gemini just because this is Google AI Studio. AI Studio is the development tool, not a requested runtime product feature.

Future architecture proposed: React + TypeScript + Vite + Tailwind, normalized Supabase Postgres with RLS, email magic link and Google sign-in. Preserve the visual design and validated catalog while migrating intentionally; do not pretend the current classic-JS app already uses React.

Future key flows from latest brief:
1. A no-login Reality Check in under 60 seconds: estimated campus-hiring month/range/unknown, daily minutes, starting level and sheet, optional SDE/undecided. Earlier end for a range; unknown is a provisional 14-day plan. Show available vs required time including revisions, shortfall, priorities and deferred scope. Saving leads to signup.
2. Shareable 1080×1920 and 1080×1080 PNG cards with numbers/Kapi/brand, Web Share where supported and download/WhatsApp-text fallback.
3. Pure typed scheduler in src/engine with weekdays, date exceptions, prerequisites, capacity validation, representative easy+medium coverage before redundant variants, and accepted plans persisted without regeneration on login.
4. Familiar basics may be 60% refresh sessions for forgot/revision levels. Never label beginner learning as revision.
5. Actual completion triggers revisions +1,+3,+7,+14 days, approximately 40% of base time with a minimum of 10 minutes. Due reviews take priority and consume real capacity; keep about 10% catch-up buffer. Help can shorten spacing to +1,+2,+5; failure gets a retry in two days and prerequisite support.
6. Today offers one main external task, due reviews, a 2-minute Start action that is not completion, and Normal/Short/Revision-only/Off choices. After repeated short sessions gently suggest reviewing availability; never increase hours automatically.
7. Comeback flow after at least two missed scheduled study days: supportive return, optional 10–15-minute tiny win, then a transparent before/after adjustment preview to accept. Preserve completed work and all history.
8. Pods with a maximum of five including creator, authenticated invites, first names and studied flags only, leave/mute, strict membership RLS; no other students' detailed progress/scores.
9. Opt-in reminders, maximum one per local day, missed-day reminders at two and five then stop. Implement only with a real configured delivery mechanism. No WhatsApp API integration implied.
10. Weekly reflection with plain stats and top two focus areas; settings with tone, theme, motion, reminders, export and account deletion.

Sheet JSON must preserve original IDs/titles and verified URLs. Our bank now has links; do not revert it to missing URLs. Striver A2Z is a clearly labelled placeholder unless I provide verified sheet data; never invent a full sheet or reuse another sheet's name for ours.

## Files to inspect

package.json, server.mjs, src/main.js; public/app.js, dsa-ui.js, dsa-bank.js, problem-links.js, dsa-planner.js, enhanced.js, extra-curriculum.js, style.css; tests/; supabase/migrations/ and verify.sql; README.md; docs/MVP_V1_PROPOSAL.md; ASSUMPTIONS.md; LATEST_MVP_BRIEF.txt.

The current app uses sequential classic scripts loaded through Vite. Preserve loading order. Look up resource links by problemId from the catalog rather than baking them into each saved task. Do not reset browser state to add links. Honor reference/practice labels, compound labels and constraint notes.

## Run and test

Use Node 22.12+ or 24+. In the website directory run npm ci, copy .env.example to .env.local, then npm run dev. Default URL http://localhost:3000. Guest mode works without credentials. Run npm test and npm run build. npm start serves the built app through Node; a static upload serves browser functionality but not server API endpoints. dist/index.html must be served over HTTP, not double-clicked through file://.

If the Studio runtime cannot serve the Node backend or connect Supabase, keep guest mode usable and explicitly explain the limitation. Do not claim a working integration from placeholder env values. Do not invent platform-specific setup features. Use supported project import if available; otherwise inspect uploaded files and request the minimum missing source context.

## Database and credentials

The original additive migration is included. Ask whether it has already been applied before changing database assumptions. Do not drop existing tables or run destructive SQL. New schema changes need a new numbered migration and a reviewable proposed schema. Keep private student rows user-scoped with RLS. Test two-user isolation and stale writes; protected pod data must not leak via joins or broadly readable profiles.

.env.example has placeholders only. Never commit .env.local, actual keys, cookies, account tokens or student backups. Public Supabase URL/publishable key may be client config protected by RLS; service-role/provider secrets must never go in VITE_ variables. Do not require my production credentials to do independent implementation and tests.

## Student data transfer

Code history and actual study progress are different. My saved study state may still be only in the original live site's browser storage. It is NOT automatically included in this archive. Use original Settings → Download backup, keep respawn-backup.json private, and Restore backup in the new app. Preserve the old import/export format or provide a safe tested adapter. Never manufacture a backup or mark unknown tasks as solved. Source archive includes complete coding progress and planning drafts, not production DB contents.

## Work process

First inspect the actual code and report what is implemented, missing or conflicting with the latest brief. The latest brief explicitly defines Phase 1 (brief restatement, open questions, schema and folders) and says wait for approval before the rewrite. A proposal already exists; inspect and revise it rather than silently starting the full rewrite. Fix focused requested issues in the current app without treating them as approval of every future phase.

When approved, implement in phases with the engine/invariant tests first, then Reality Check/share, auth/Today, plan/comeback, pods/reminders/reflection/settings. Keep each phase runnable. Test daily capacity, prerequisite ordering, revisions, deduplication, exceptions, failures, repeated rescheduling and history preservation with meaningful fixtures. In development fail loudly on invalid schedules; in production only use a validated fallback and explain reduced scope.

Maintain accessible contrast/focus, 44px touch targets, keyboard controls and reduced motion. Measure mobile Lighthouse performance/accessibility before claiming >=90. Report exactly what changed, what was tested and which credential-dependent checks remain. Do not call a feature working merely because its button is present.

Start by reading the attached project and giving me a concise current-state audit plus the next concrete action.
