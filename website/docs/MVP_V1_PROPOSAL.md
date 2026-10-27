# Respawn MVP v1 — Phase 1 proposal

Status: proposed, awaiting the approval requested in Part G of the supplied build brief.
Product name: **Respawn**. Target repository: **AryanGupta9719/respawn**.
This document supersedes earlier AI, payment and multi-subject proposals for the new MVP. No application code, live database, hosting audience or deployed website has been changed in this phase.

## Product, in eight points

1. Respawn is a comeback companion for Indian students preparing for entry-level software developer jobs.
2. It organises the sheet a student already follows; it does not host problem statements, videos or solutions.
3. A visitor gets a no-login Reality Check from hiring estimate, available time, starting level and sheet.
4. Unknown hiring dates produce an explicitly provisional 14-day plan, never a fabricated deadline.
5. Today shows one main problem, due revision, a small start action and an honest day-type choice.
6. Recovery starts with a small win, then previews exactly what moved, stayed and was deferred.
7. Up to five students can support each other in a private pod that shares first names and studied/not-yet status only.
8. Rescheduling is free. No AI, payments, company-specific claims, other-subject content, ranking or readiness score.

## Architecture and reuse

Use React + TypeScript + Vite + Tailwind, as requested. This replaces the old classic-script/Node-API architecture rather than layering another override onto it. Retain the supplied 196 problem IDs/titles and the recognizable cream/sage visual direction, original SVG Kapi, night mode and reduced motion. Use the updated palette in the new brief.

The frontend is a static build. Supabase supplies magic-link/Google Auth, Postgres, Edge Functions for privileged operations, and scheduled reminder delivery. No browser API secret, AI route or payment configuration will be included in the new MVP.

Store the brand once in `src/config/brand.ts`. Put playful/plain pairs in `src/content/strings.ts`. Persist accepted plans and load them on return; merely signing in does not regenerate them.

## Proposed data model

All tables have RLS enabled. Use names prefixed `respawn_` for the new normalized schema. Retain the existing `preparc_*` schema until an explicit, tested data-import step maps the old JSON records; no destructive reset.

| Table | Key fields / constraints | Access policy |
| --- | --- | --- |
| profiles | user_id PK → auth.users; name; college; graduation_year; timezone; hiring_kind/from/to; level; daily_minutes_by_weekday JSON; unavailable_dates; sheet_id; banter; reduced_motion; theme | Own row only. Do not let pod members select another profile. No client-editable role field. |
| sheets | id PK; name; source_url; content_version; sample_only; enabled | Public read of enabled catalog metadata. Seed/admin writes only. |
| sheet_items | composite PK (sheet_id, item_id); original order/title/topic/subtopic; difficulty; est_minutes; prerequisite IDs; nullable verified URL; content_version | Public read for enabled non-sample sheet data. Seed/admin writes only. Preserve original IDs within a sheet. |
| plans | id PK; user_id; created_at; version; inputs_json; summary_json; active; engine_version | Own read. Atomic save RPC only. Unique active plan per user. |
| plan_days | PK (plan_id, local_date); capacity_minutes; buffer_minutes; task_list JSON | Read through owning plan. Written only by atomic plan-save RPC. |
| attempts | id PK; user_id; sheet_id/item_id; client_event_id; occurred_at; local_date; result; proof_url; is_revision; revision_id | Own read and validated append RPC. Unique (user_id, client_event_id) prevents repeated clicks duplicating history. |
| revisions | id PK; user_id; sheet_id/item_id; anchor_attempt_id; step; due_date; scheduled_date; status | Own read; created/updated by attempt and plan RPCs. Unique (user_id, anchor_attempt_id, step). Never remove completed review history. |
| deferred_items | PK (plan_id, sheet_id, item_id); reason; previous_date; requested_return | Own read through plan. Written with a plan version. Bring back requests must pass feasibility. |
| pods | id PK; name; owner_id; timezone; created_at | Member-only read. Create/edit/leave through membership-aware RPCs. |
| pod_members | PK (pod_id, user_id); joined_at; muted | Member-only roster read. No direct client inserts/updates. A locked join transaction enforces maximum five, including owner. |
| pod_invites | id; pod_id; token_hash; expires_at; revoked_at | Not directly readable by clients. RPC verifies a high-entropy token and current capacity after authentication. |
| daily_activity | PK (user_id, local_date); studied bool; updated_at | Own read. Derived from a recorded study attempt; raw peer activity is never exposed. |
| reminders_settings | user_id PK; opted_in; channel; local_time; timezone; comeback_enabled | Own row only; validate channel readiness before allowing opt-in. |
| reminder_deliveries | id; user_id; local_date; kind; provider_reference; status; sent_at; idempotency_key | Own read, privileged sender writes. Unique (user_id, local_date) enforces at most one reminder total per local day. |

### Important transactions and boundaries

- `save_plan(expected_version, proposal, event_id)`: authenticate, validate ownership and references, reject a stale version, atomically save days/deferred rows and switch the active version. Retain earlier versions.
- `record_attempt(event_id, item, result, proof_url)`: append idempotently, update own activity, and create/update review occurrences. A failed solve is attempted, not completed.
- `get_pod_view(pod_id)`: check membership first; return only first names, each member's studied/not-yet flag for their local day, and pod active-day count for the pod's week. No email, college, score, attempts, problem count or private history.
- `join_pod(token)`: verify token hash/expiry, lock the pod, and enforce the member limit atomically. Knowing a pod UUID never grants membership.
- Leaving transfers ownership to the oldest remaining member; an empty pod can be removed. Muting changes only the member's own preference.
- Edge account-deletion function validates the caller's JWT and explicit UI confirmation, then deletes that same Auth user. No arbitrary target user ID accepted. Service credentials stay inside the function.
- Helper functions for membership checks must avoid recursive RLS policies. Privileged functions have a fixed search path and minimum grants; authenticated users cannot directly modify protected rows.
- Importing a guest plan at signup is explicit, versioned and idempotent. Never silently merge two accounts. Reality Check inputs survive magic-link/OAuth redirects in a local draft.

## Deterministic engine

Inputs: immutable sheet data, known/familiar basics, level, weekday minutes, date exceptions, hiring estimate, current local date, completed work and attempts. No network calls or storage inside the engine.

1. Resolve an estimated hiring month to its first day; for a range, use the earlier month and state that assumption. If hiring may already have started, say so and offer an explicitly provisional rolling window.
2. Sum actual capacity over the half-open interval [today, target_date). Reserve approximately 10% per day; revision consumes the remaining capacity along with practice.
3. Use supplied order with stable prerequisite ordering. Default absent durations to easy 25 / medium 45 / hard 70 minutes, configurable.
4. For insufficient capacity, select representative first-easy/first-medium examples per supplied subtopic, include prerequisite closure, then use remaining capacity for variations in sheet order. Round-robin topic coverage prevents basics consuming the entire short plan.
5. Familiar basics may use a 60% Refresh estimate for the two revision-oriented levels. Do not label a beginner's first encounter revision or infer completion from confidence.
6. Initial required-hours reporting includes a clearly labelled revision allowance. Actual revision occurrences are anchored to recorded completion, not invented completion dates.
7. Successful completion creates due review occurrences at +1/+3/+7/+14 calendar days, costing max(10 minutes, 40% of base estimate). Needed help uses +1/+2/+5 and a later configured review; could not solve creates a retry at +2 and a prerequisite suggestion.
8. Due reviews receive capacity first, then eligible work. Preserve original due dates if a review must move; show overdue/deferred review rather than hiding it. An indivisible problem that cannot fit any session produces a visible conflict.
9. A short day picks a fitting due review, otherwise the smallest eligible item. A two-minute Start is an activation step, not evidence that the entire problem fits or is complete.
10. Validate every proposal: capacity, available dates, prerequisites, stable task IDs, no duplicates, and unchanged completed history. Throw with diagnostics in development. In production try a separately validated sequential fallback; if it also fails, show the conflict without replacing the active plan.

Missed-day detection counts scheduled study days with no activity, not weekends or chosen days off. Five missed days do not mean five days of work must all move to tomorrow. Every replan shows per-task old/new dates, retained work, added/deferred items and changed shortfall.

## Proposed folder structure

| Path | Responsibility |
| --- | --- |
| src/config/ | Brand, estimates, buffer and review intervals |
| src/content/strings.ts | Central playful/plain copy |
| src/engine/ | Pure capacity, selection, prerequisites, revisions, scheduling, recovery and validation modules + tests |
| src/data/ | Typed sheet loader and schema validation |
| data/sheets/ | Original 196-bank JSON; disabled, labelled Striver sample JSON |
| src/components/ | Kapi, RealityStep, TaskCard, RevisionCard, ShareCard, PlanDiff, PodStrip, controls |
| src/features/reality-check/ | Five short questions, honest result and share/export |
| src/features/auth/ | Magic link, Google callback and guest draft handoff |
| src/features/today/ | Main task, outcome feedback and day-type choices |
| src/features/plan/ | Week/list, availability editing and always-visible deferred work |
| src/features/comeback/ | Welcome-back, tiny win and accepted replan |
| src/features/pods/ | Create/join/member status/leave/mute |
| src/features/reflection/ | Sunday or next-visit weekly summary |
| src/features/settings/ | Theme, motion, banter, reminders, export, deletion |
| src/lib/supabase/ | Public client, typed repositories and RPC boundary |
| supabase/migrations/ | New additive normalized-schema and import migrations |
| supabase/functions/ | Account deletion and authenticated/scheduled reminder delivery |
| tests/ | Engine, RLS/privacy integration and browser acceptance scenarios |

## Sharing, reminders and privacy

Render 1080×1920 and 1080×1080 PNG cards locally from the same result data. Include only available/required/shortfall numbers, Kapi and Respawn branding. Do not include account name, campus, target company, auth token or private plan URL. Use Web Share when supported; otherwise download plus an ordinary WhatsApp text/share link. Do not integrate WhatsApp APIs.

Proposed simplest MVP reminder route: opt-in email through a Supabase scheduled Edge Function and a configured delivery provider. A capability check must report unavailable setup honestly; saving a time alone is not proof of delivery. Use the student's timezone and a delivery ledger for idempotency. The daily reminder and comeback notices share the same one-per-day cap. Comeback messages occur after two and five missed scheduled days, then stop. Opt-out takes effect before the sender selects recipients. Web push can be a supported alternative if chosen later; no need to build two senders at once.

## Blocking inputs and defaults to review

1. The existing 196-bank source contains titles and IDs but **no original problem URLs**. Please provide the verified URL mapping, or approve importing with null URLs and disabled Open problem actions until supplied. I will not guess links. The planner can still be built/tested with those titles and explicit placeholder-link states.
2. Striver data is not supplied. Three clearly labelled synthetic sample records demonstrate the schema but are excluded from real plans/sharing and the sheet choice stays Coming soon until verified data is supplied.
3. Supabase public project settings and Google OAuth configuration are needed only when connecting Auth; never paste server secrets into chat. Missing service configuration will not be disguised as working integration.
4. Use Asia/Kolkata as the initial profile timezone, browser-detected timezone editable in settings. Date-only planning avoids UTC date drift.
5. Only familiar topics get Refresh. If familiarity is unknown, do not shorten the estimate merely because a student chose a confident overall label.
6. The normalized schema is a proposal, not an applied migration. Existing cloud/local progress remains intact until a reviewed import is implemented.

## Build phases and evidence

After approval: engine/tests → Reality Check and share cards → Auth/Today → Plan/Comeback → Pods/reminders/reflection/settings. After each phase, report what is implemented, assumptions and remaining external configuration.

Required checks include shortfall, unknown dates, five missed scheduled days, review spacing, prerequisite order, day-type capacity, duplicate events, preservation of history, stale plan saves, pod privacy and concurrent sixth-member denial. Browser checks cover 360px layout, keyboard/focus, share fallback and the comeback flow. Lighthouse targets are at least 90 for mobile performance/accessibility; report measured results, never assume them from a successful build.
