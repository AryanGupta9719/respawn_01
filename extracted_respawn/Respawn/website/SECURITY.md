# Security

Never include credentials or private student records in public issues.
If credentials are accidentally committed, revoke/rotate them before continuing.
Do not disable Supabase RLS or put a service-role/API secret in browser variables.
The application uses user-scoped RPC saves and optimistic revision checks.
See docs/VERIFICATION.md for what has and has not been tested.
