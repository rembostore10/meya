# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### `birthday-surprise` (web)

Interactive Indonesian birthday surprise web experience with pink romantic theme. Click-driven flow:

1. **Opening** — animated envelope with rose petals
2. **RomanticMessages** — typed messages, click to advance
3. **PhotoGallery** — swipeable image carousel; "Lanjut" button only appears after the user reaches the last photo
4. **GiftBox** — interactive gift unwrap with confetti
5. **BirthdayCake** — clickable candles to blow out
6. **PrayerForm** — textarea to write a prayer/wish; submitting POSTs to `/api/prayers` which forwards the message to a Telegram chat
7. **FinalMessage** — closing thank-you screen with restart

Key files:
- `artifacts/birthday-surprise/src/components/Experience.tsx` — stage state machine
- `artifacts/birthday-surprise/src/components/PhotoGallery.tsx` — gated swipe gallery
- `artifacts/birthday-surprise/src/components/PrayerForm.tsx` — uses generated `useSendPrayer` hook
- `artifacts/birthday-surprise/src/index.css` — pink/rose theme tokens
- `artifacts/birthday-surprise/src/components/ParticleBackground.tsx` — floating hearts, flowers, sparkles, twinkling stars
- All copy is in Bahasa Indonesia, no emojis in UI

### `api-server`

Express 5 API mounted at `/api`. Routes split by file in `artifacts/api-server/src/routes/`:
- `health.ts` — `/healthz`
- `prayers.ts` — `POST /prayers` validates with Zod (`SendPrayerBody` from `@workspace/api-zod`) and POSTs to `https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/sendMessage` with chat_id `6161828437`. The user must have started the bot once.

OpenAPI source: `lib/api-spec/openapi.yaml`. After editing, run `pnpm --filter @workspace/api-spec run codegen` to regenerate hooks and Zod schemas. Schema names that would collide with operation-derived Zod constants (e.g. `SendPrayerBody`) are aliased in the spec (use `Prayer`, `PrayerResult`).

### Required secrets

- `TELEGRAM_BOT_TOKEN` — Bot token used to forward prayers to the user's Telegram
