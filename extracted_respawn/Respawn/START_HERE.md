# Respawn — complete snapshot, 27 October 2026

This is the current runnable prototype, including the latest 196-problem resource-link update and pending planning drafts. The latest MVP rewrite is proposed, not implemented.

## Start on your Mac

Install Node.js 22.12+ or 24+, then in Terminal:

```sh
cd /path/to/Respawn/website
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. No credentials are needed for guest mode.
For validation: `npm test` and `npm run build`.
For production-style serving: `npm run build` then `npm start`.
Do not double-click dist/index.html: assets expect HTTP hosting.

## Continue in Google AI Studio

Open GOOGLE_AI_STUDIO_PROMPT.md and paste its contents into your coding conversation. Attach/import the website source using the supported project/file workflow. The complete source is under website/. If ZIP import is unavailable, extract it and supply files as supported by the tool. The prompt describes both the current prototype and the later MVP direction, which deliberately differ.

## Files included

- website/: complete source, lockfile, environment example, original Supabase migration and verification SQL, CI, tests, prebuilt dist, pending proposal and assumptions.
- Respawn.bundle: complete Git history and branches available at packaging time.
- GOOGLE_AI_STUDIO_PROMPT.md: full continuation prompt.
- LATEST_MVP_BRIEF.txt: original latest user brief, authoritative over old product context.
- SNAPSHOT.json: source commit and scope/verification notes.
- SHA256SUMS.txt: hashes for archive contents (except this hash file itself).

The website source corresponds to GitHub commit 5807b3aed33939f31c81dacf8aa46ad729e05054 plus the two pending planning documents. Build output is included for convenience. Dependencies are reproducibly installed through npm ci; node_modules and credentials are excluded.

## Transfer YOUR saved study progress

This archive contains all code and design progress, NOT your original browser's private study data or a Supabase database dump.

1. On the original live site, open Settings.
2. Click Download backup and retain respawn-backup.json privately.
3. Run the new copy, open Settings and click Restore backup.
4. Choose that JSON and check tasks, attempts and settings.

Do this before clearing the original browser/site storage. Different domains and localhost have separate storage. You do not need to paste that private backup into AI Studio to continue coding. If you previously enabled real cloud saving, connect the same project with your own configuration and test it; no credentials or live student data are bundled.

## Supabase

Use website/supabase/migrations/202610250001_preparc.sql in SQL Editor for the existing prototype, then website/supabase/verify.sql. Fill only your own env values locally. If you already ran the migration, preserve existing data and use additive future migrations. Supabase login/cloud tests still require real configuration. Optional legacy Anthropic endpoint needs a Node backend and separate credentials; latest proposed MVP removes AI/payments/non-DSA scope.

## Restore Git history (optional)

```sh
git clone Respawn.bundle respawn-history
```

The main branch contains current source; local-prepublish preserves earlier history. The pending proposal files are in website/ and are not part of the committed history.
