# ReuseConnect Partner Test

Fake referral-partner website for testing the ReuseConnect iframe embed flow.

## What it does

1. Users sign in against a small seed DB (`data/users.json`).
2. Server route `POST /api/embed-session` calls ReuseConnect `POST /api/embed/session` with the embed API key.
3. `/portal` loads the returned URL in an iframe.

## Local setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Runs on [http://localhost:3001](http://localhost:3001) if you set a custom port, or the Next default `3000` — use another port if the backend already uses `3000`:

```bash
npm run dev -- -p 3001
```

### Env vars

| Variable | Example |
|----------|---------|
| `REUSECONNECT_API_BASE_URL` | `https://xxxx.ngrok-free.app` (or `http://localhost:3000` when calling local API from local Next) |
| `REUSECONNECT_EMBED_API_KEY` | Partner embed API key from admin |
| `REUSECONNECT_EMBED_ORIGIN` | Vercel embed URL, e.g. `https://your-embed.vercel.app` |

### Backend / admin checklist

- Enable **Iframe embed portal** on the referral partner.
- Add this site’s origin to the partner **allowed origins** (local + Vercel).
- Point backend `EMBED_FRONTEND_URL` at the embed Vercel URL.
- Include the partner site origin in backend `CORS_ORIGIN` if needed.
- Expose local backend with ngrok when the partner site is on Vercel.

## Seed users

All passwords: `password123`

- `jane.doe@acme-test.com`
- `john.smith@acme-test.com`
- `returning@acme-test.com`

## Pages

- `/` — home
- `/login` — partner login
- `/users` — seed user list
- `/portal` — full-bleed embed iframe (partner header only; no partner sidebar)

### Portal layout (partner practice)

- Partner owns site chrome: header + logout.
- ReuseConnect owns product chrome: sidebar + page header inside the iframe.
- `/portal` is full-bleed under the partner header so users do not see two sidebars.

## Deploy (Vercel)

1. Import this folder as a Vercel project.
2. Set the three env vars above (API base = ngrok URL while backend is local).
3. Deploy, then add the Vercel URL to the partner allowed origins.
