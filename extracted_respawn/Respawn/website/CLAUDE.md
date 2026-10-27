# Respawn implementation instructions
Read README.md and docs/PRODUCT_CONTEXT.md before editing. Preserve Respawn's existing visual identity and the exact 196 problem IDs. This is a runnable codebase, not a request for a fresh mockup.

Use Node 22.12+ / 24+, npm ci, npm test, npm run build. Do not log env values. Do not commit .env.local, node_modules, dist, tokens, cookies or actual student data. Never put ANTHROPIC_API_KEY or a Supabase secret/service_role key in VITE_ variables. No service role key is needed for this schema.

Reuse the additive Supabase migration. Never drop user tables to fix a failed migration. Once the user runs it, new schema changes belong in a new numbered migration. Test using non-sensitive fixtures.

The desired GitHub origin is https://github.com/AryanGupta9719/respawn.git. Inspect/reuse an existing checkout. Preserve unrelated work, inspect git diff and git status, run relevant checks, then normal commit/push. No force push, hard reset, or blind reinitialization.

Finish the credential-dependent checks after the user fills .env.local: signup/confirmation, login, recovery, cloud saving across two devices, two-user isolation, stale-version conflict, authenticated AI success/failure/quota. Never claim those passed if credentials are missing. Continue independent tasks before asking for a genuinely blocking user step.
