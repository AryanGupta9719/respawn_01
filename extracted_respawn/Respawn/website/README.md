# Respawn

**Placement preparation, one small win at a time.**

A calm preparation planner for Indian college students. Respawn fits daily
learning around available time and an estimated campus-hiring window. It keeps
revision and recovery visible rather than adding every missed task to tomorrow.

## Features

- The complete 196-question DSA bank with priorities, prerequisites and estimates.
- Direct LeetCode/GeeksforGeeks resources for every question, including labelled references and constraint notes.
- Included/deferred/completed states and Pin, Defer and Restore controls.
- Gradual onboarding, a small warm-up and optional company/role goals.
- Estimated hiring month or an explicitly provisional 14-day rolling plan.
- Short SQL, aptitude, OS, DBMS, OOP and networking starter exercises.
- Revision sessions, catch-up capacity, daily tasks, calendar and progress garden.
- Original animated Kapi mascot, night study, reduced motion and Less banter.
- Supabase email/password accounts, cloud saving and stale-version checks.
- Optional, constrained AI suggestions for DSA priority IDs, with deterministic validation and fallback.
- Local JSON export/import for backups.

The additional-subject content and time estimates need educational review.
AI does not invent schedules, task durations or company-frequency facts. There
is no code judge, placement guarantee or live billing. The ₹700 rescheduling
idea is a disabled future proposal with undecided access terms.

## Local setup

Use Node.js **22.12+ or 24+**.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Without credentials, guest mode and the rule-based
planner work. Enter real values only in `.env.local`; never commit it.

## Supabase: use your existing project

1. Open SQL Editor and run the entire file `supabase/migrations/202610250001_preparc.sql`.
2. Run `supabase/verify.sql`; expect 196 catalog rows.
3. Enable email/password authentication and set the Site URL and allowed local redirect to `http://localhost:3000`.
4. Fill the public URL and publishable/anon key variables in `.env.local`, then restart.
5. Register/confirm email, save a plan, and verify it in another browser.

No service-role key is required. Never put a secret/service-role key in a
`VITE_` variable. The public key is protected by user-scoped RLS and authenticated
RPC writes. Cloud saves reject stale revisions instead of overwriting another
device's changes. A fresh account does not silently import another user's data.

### Rename compatibility

The brand, package and GitHub target are now **Respawn** under **AryanGupta9719**.
Existing `preparc_*` database names and browser keys remain compatibility
identifiers. Keeping them avoids erasing saved plans or introducing a second
conflicting schema if the earlier migration was already run.

## Optional AI

Fill `ANTHROPIC_API_KEY` and an API model ID available in your account in the
server-only env variables. API billing is separate from the website's source
and may be separate from your coding-assistant subscription.

The server authenticates the Supabase token and checks a persistent quota of
5 requests per user per UTC day before calling the provider. It rejects unknown
or duplicate IDs. With missing keys or provider failure, the existing plan and
the rule-based fallback remain usable. AI is a priority suggestion layer,
not unrestricted full-plan generation.

## Commands

```sh
npm test
npm run build
npm start
```

Production needs the Node server, HTTPS, a correct `APP_URL`, and matching auth
redirect settings. A static `dist/` upload alone does not serve the AI endpoint.

## Source map

| Path | Purpose |
| --- | --- |
| `public/dsa-bank.js` | Canonical 196 problems |
| `public/problem-links.js` | Verified resource mappings, platform labels and variant notes |
| `public/dsa-planner.js` | Pure selection and scheduling rules |
| `public/app.js`, `public/dsa-ui.js` | Existing visual UI and DSA screens |
| `public/enhanced.js` | Flexible onboarding, cloud and short-day integration |
| `public/extra-curriculum.js` | Original starter exercises |
| `public/style.css` | Theme tokens and responsive styling |
| `src/main.js` | Supabase client and ordered UI bootstrap |
| `server.mjs` | Local/production serving and protected AI endpoint |
| `supabase/migrations/` | Additive schema and seed SQL |
| `docs/PRODUCT_CONTEXT.md` | Product requirements |
| `docs/VERIFICATION.md` | Test evidence and integration limits |

## Verification

Scheduler tests, server validation/fallback tests and the production build
pass locally. The migration was tested twice in a PostgreSQL-compatible local
fixture, including two-user isolation, idempotent saves, stale-save rejection
and quota. Real hosted Supabase, email recovery, cross-device login and live AI
must still be verified after credentials are supplied. CI repeats tests and the
build; it does not claim credential-dependent checks passed.

## GitHub target

Owner: **AryanGupta9719**. Repository: **respawn**.
The configured origin is `https://github.com/AryanGupta9719/respawn.git`.
GitHub: https://github.com/AryanGupta9719/respawn

The existing repository audience is preserved. This publishes source code, not a running production website.
