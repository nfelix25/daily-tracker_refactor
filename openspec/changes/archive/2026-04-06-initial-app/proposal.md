## Why

A personal daily tracker for habits and chores is needed to replace an existing manual calendar. The project's primary purpose is to serve as a structured refactoring exercise: the initial app is built with React/Express/SQLite/CSS, then incrementally migrated to Web Components/tRPC/Drizzle/Tailwind — one layer at a time.

## What Changes

- Introduce a full-stack monorepo (client + server) built with React, Vite, Express, and SQLite
- Implement habits and chores as trackable items with daily/weekly frequency
- Support daily view, weekly view, and history view
- Track completions and compute simple streaks/stats
- Structure the codebase with extreme modularity (one file per route, action, component) to enable fine-grained refactoring
- Embed working first-step examples for each target technology: `<habit-card>` web component, `Badge` component with Tailwind, `getAllHabits` via Drizzle, `habits.getAll` via tRPC on a second server
- Add Vitest (co-located, with demo tests) and Playwright (e2e skeleton with one demo spec)

## Capabilities

### New Capabilities

- `items`: Core data model — habits and chores as a single shared `items` table with type and frequency fields
- `completions`: Recording and querying daily completions per item
- `streaks`: Computing current streak from completion history
- `daily-view`: Displaying and completing today's habits and chores
- `weekly-view`: Displaying and completing this week's habits and chores
- `history-view`: Browsing past completions
- `refactor-first-steps`: Working coexisting examples for Web Components, Tailwind, Drizzle, and tRPC

### Modified Capabilities

## Impact

- New monorepo at repo root: `client/` (Vite + React) and `server/` (Express + SQLite)
- Root `package.json` with `concurrently` scripts only — no workspaces
- New `e2e/` directory for Playwright
- Dependencies: React, Vite, Express, better-sqlite3, Vitest, Playwright, Tailwind, PostCSS, Drizzle, tRPC, @trpc/server, @trpc/client
- No external services, no auth, strictly single-user/local
