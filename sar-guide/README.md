# SAR guide (Agent SDK)

Domain assistant for **Vals del Agua** — bilingual ES/EN help over NISAR GCOV + OPERA tools.

## Prerequisites

- Node 22.13+ (never Bun)
- Cursor credential: `npx --yes "@grok/agent-sdk@0.6.0" login`  
  or `CURSOR_API_KEY` / `CURSOR_API_KEY_FILE` / `CURSOR_SERVICE_ACCOUNT_KEY`

## Run

```bash
cd sar-guide
npm install
npx --yes "@grok/agent-sdk@0.6.0" login   # if whoami says not signed in
npx --yes "@grok/agent-sdk@0.6.0" validate
npx --yes "@grok/agent-sdk@0.6.0" serve   # playground + HTTP
```

Smoke eval (needs model credential):

```bash
npx --yes "@grok/agent-sdk@0.6.0" eval evals/smoke.eval.ts
```

## Offline / no login

The web app talks to the **catalog stub** instead:

```bash
# from repo root
npm run dev          # starts Vite + server/catalogProxy.ts
# POST /api/sar-guide/stub  { "question": "..." }
```

## Tools

- `search_nisar_gcov`
- `search_opera_fallback`
- `compare_dates`
- `explain_polarization`
- `hypothesize_drivers`
