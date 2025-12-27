# Textbook Marketplace Frontend

Next.js 16 frontend application for textbook marketplace platform.

## Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm 8+ (install via: `curl -fsSL https://get.pnpm.io/install.sh | sh -`)

## Installation

Install dependencies:

```bash
pnpm install
```

## Environment Setup

Copy `env.example` to `.env`:

```bash
cp env.example .env
```

Configure environment variables in `.env`:

- `NEXT_PUBLIC_API_BASE_URL`: Backend API base URL (default: `http://localhost:8000`)
- `NEXT_PUBLIC_WS_URL`: WebSocket URL for chat (default: `ws://localhost:8000`)

DO NOT commit `.env` to version control.

## Local API Connection

### Backend Requirements

Backend MUST be running on `http://localhost:8000` (or configure `NEXT_PUBLIC_API_BASE_URL`).

### Development Setup

1. Start backend server (see backend repository README)
2. Verify backend health: `curl http://localhost:8000/api/health/`
3. Start frontend: `pnpm dev`
4. Open `http://localhost:3000`

### API Configuration

API client configured in `src/services/api.ts`:

- Base URL: `process.env.NEXT_PUBLIC_API_BASE_URL`
- Automatic token refresh on 401 responses
- Bearer token authentication via `Authorization` header

### WebSocket Configuration

WebSocket service configured in `src/services/websocketService.ts`:

- URL: `process.env.NEXT_PUBLIC_WS_URL` (default: `ws://localhost:8000`)
- Endpoint: `/ws/chat/?token={access_token}`
- Automatic reconnection on disconnect

## Development

Start development server:

```bash
pnpm dev
```

Start with Turbopack:

```bash
pnpm dev:turbo
```

Application runs on `http://localhost:3000`.

## Available Scripts

- `pnpm dev`: Start development server
- `pnpm dev:turbo`: Start development server with Turbopack
- `pnpm build`: Build production bundle
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint
- `pnpm test`: Run Jest unit tests
- `pnpm test:watch`: Run Jest in watch mode
- `pnpm test:e2e`: Run Playwright E2E tests
- `pnpm test:e2e:ui`: Run Playwright with UI mode

## Testing

### Unit Tests

Jest configured with `jsdom` environment. Unit tests are located in `src/` with `.test.ts` or `.test.tsx` extension.

Run all unit tests:

```bash
pnpm test
```

Run tests in watch mode:

```bash
pnpm test:watch
```

Run specific test file:

```bash
pnpm test TextbookCard.test.tsx
```

**Note:** 
- E2E tests in `e2e/` directory are excluded from Jest (configured in `jest.config.js`)
- Unit tests can be run in CI/CD pipelines (no backend required)

### E2E Tests

Playwright configured with base URL `http://localhost:3000`. E2E test files MUST be located in `e2e/` directory.

**Note:** E2E tests are excluded from CI/CD pipeline because they require a running backend server. Run them locally during development or manually before deployment.

**Prerequisites:**
- Backend server MUST be running on `http://localhost:8000` (see backend repository README)
- Development server is automatically started before tests (configured in `playwright.config.ts`). If server is already running on port 3000, it will be reused.

Run all E2E tests:

```bash
# 1. Start backend server first
cd ../sbook-backend/textbook_marketplace
uv run python manage.py runserver

# 2. In another terminal, run E2E tests
cd ../sbook-frontend
pnpm test:e2e
```

Run E2E tests with UI mode:

```bash
pnpm test:e2e:ui
```

Run specific E2E test file:

```bash
pnpm test:e2e textbook-flow.spec.ts
```

## Project Structure

```text
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── hooks/           # Custom React hooks
├── providers/       # Context providers
├── services/        # API and WebSocket services
├── stores/          # Zustand state stores
└── utils/           # Utility functions and types
```

## Technology Stack

- Next.js 16.1 (App Router)
- React 19
- TypeScript 5.8
- Tailwind CSS 4.0
- Zustand 5.0 (state management)
- Axios 1.8 (HTTP client)
- Zod 3.24 (validation)
- Jest 30.2 (unit testing)
- Playwright 1.57 (E2E testing)

## Image Configuration

Next.js image optimization configured in `next.config.ts`:

- Development: `http://127.0.0.1:8000/media/**`
- Production: `https://api.sb.maria.rezvov.com/media/**`

## Build

Build production bundle:

```bash
pnpm build
```

Start production server:

```bash
pnpm start
```

## Troubleshooting

### API Connection Issues

1. Verify backend is running: `curl http://localhost:8000/api/health/`
2. Check `NEXT_PUBLIC_API_BASE_URL` in `.env`
3. Verify CORS configuration on backend

### WebSocket Connection Issues

1. Verify WebSocket endpoint is accessible
2. Check `NEXT_PUBLIC_WS_URL` in `.env`
3. Verify authentication token is valid

### Build Errors

1. Clear `.next` directory: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && pnpm install`
3. Verify Node.js version compatibility
