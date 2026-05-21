@AGENTS.md

# Security Rules

## Secrets — never expose in client code
- `OPENAI_API_KEY` — only in API routes (`src/app/api/`), never in `"use client"` files
- `CLUB_TOKEN`, `CLUB_PASSWORD` — only in server-side code, never in client bundles
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHANNEL_ID` — only in API routes
- `CRON_SECRET` — only validated server-side in cron/admin routes
- Never import `process.env.SECRET_*` in components marked `"use client"`
- Never commit `.env.local` — it is in `.gitignore`, keep it there

## Authentication
- Club access is determined by the `club_token` httpOnly cookie — never replicate this check client-side as a security gate
- Rate limiting in `AgentWidget.tsx` is UX-only (localStorage) — do not rely on it for security
- The `/api/auth/check` endpoint is for UI hints only, not access control
- Paid lesson access is enforced server-side in `[lesson]/page.tsx` via `if (!lessonMeta.free) notFound()`

## API routes
- All cron and admin endpoints must validate `CRON_SECRET` before doing anything
- The `/api/agent` route must never log or store user messages
- When YuKassa webhook is added: always verify the webhook signature before processing payment events
- Never return raw error stack traces to the client — log server-side, return generic message

## Input handling
- The agent API accepts `messages[]` from the client — always slice to last 10, never trust the full array
- Never pass user input directly to shell commands or file paths
- Sanitize any user-provided slugs before using in `fs.readFileSync` calls

## Payments (when implemented)
- YuKassa `secretKey` and `shopId` must only live in server-side env vars
- Webhook handler must verify `X-Request-Id` and amount before setting the `club_token` cookie
- Set `club_token` cookie with `httpOnly: true`, `secure: true`, `sameSite: "lax"`
