# Verification at handoff

Passed:
- npm install / lockfile creation.
- npm test: DSA scheduling suite and two server tests.
- npm run build.
- Browser guest progressive onboarding and 14-day preview save.
- PostgreSQL-compatible local PGlite fixture: migration twice, 196 catalog rows, authenticated save, duplicate-event idempotency, stale revision rejected, another user's state/snapshots invisible, direct update denied, sixth AI quota request denied, anonymous save RPC denied.

Not performed:
- User's hosted Supabase migration/existing-schema compatibility.
- Real registration/confirmation/recovery delivery and cross-device sessions.
- Real Anthropic model call and billing.
- GitHub push from the user's Mac.
- Complete curriculum validation or user learning-effectiveness testing.

A successful local SQL fixture does not replace the hosted two-account integration test. A successful Vite build does not establish that live credentials work.
