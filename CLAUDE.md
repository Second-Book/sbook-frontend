# CLAUDE.md — 🎨 front

Frontend repo for **SecondBook**. Cross-cutting docs (setup, deployment, architecture overview) → see `../sbook-proto/CLAUDE.md`.

## Commands

Package manager: `pnpm`. Run from repo root.

```bash
pnpm install            # Install deps
pnpm dev                # Dev server :3000 (Turbopack)
pnpm dev:turbo          # Dev with Turbopack (explicit)
pnpm build              # Production build
pnpm lint               # ESLint
pnpm test               # Jest unit tests
pnpm test:watch         # Jest watch mode
pnpm test:e2e           # Playwright E2E tests
pnpm test:e2e:ui        # Playwright with UI
```

## Architecture

Next.js 16 with App Router, React 19, TypeScript.

- **State**: Zustand (`src/stores/userStore.ts`) with localStorage persistence for auth
- **API client**: Axios (`src/services/api.ts`) with auto token refresh on 401
- **WebSocket**: custom singleton (`src/services/websocketService.ts`) with auto-reconnect
- **Validation**: Zod schemas (`src/utils/schemas.ts`)
- **Styling**: Tailwind CSS v4, Font Awesome icons
- **Forms**: Server actions (`src/utils/actions.ts`) with Zod validation
