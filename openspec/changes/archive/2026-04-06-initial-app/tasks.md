## 1. Monorepo Scaffold

- [x] 1.1 Create root `package.json` with `dev`, `install:all`, and `test` scripts using `concurrently`
- [x] 1.2 Create `client/package.json` with React, Vite, and Vitest dependencies
- [x] 1.3 Create `server/package.json` with Express, better-sqlite3, and Vitest dependencies
- [x] 1.4 Create `client/index.html` and `client/vite.config.js`
- [x] 1.5 Create `client/vitest.config.js`
- [x] 1.6 Create `server/vitest.config.js`

## 2. Database — Schema & Connection

- [x] 2.1 Create `server/src/db/connection.js` exporting a single better-sqlite3 instance
- [x] 2.2 Create `server/src/db/schema.sql` with `items` and `completions` table definitions (including unique constraint and cascade)
- [x] 2.3 Create `server/src/db/seed.js` with a few sample habits and chores

## 3. Database — Raw SQL Actions (habits)

- [x] 3.1 Create `server/src/db/actions/habits/getAllHabits.js` (with streak + totalCompletions)
- [x] 3.2 Create `server/src/db/actions/habits/createHabit.js`
- [x] 3.3 Create `server/src/db/actions/habits/deleteHabit.js`
- [x] 3.4 Create `server/src/db/actions/habits/completeHabit.js`
- [x] 3.5 Create `server/src/db/actions/habits/getAllHabits.test.js` (demo: in-memory SQLite, asserts rows returned)

## 4. Database — Raw SQL Actions (chores)

- [x] 4.1 Create `server/src/db/actions/chores/getAllChores.js` (with streak + totalCompletions)
- [x] 4.2 Create `server/src/db/actions/chores/createChore.js`
- [x] 4.3 Create `server/src/db/actions/chores/deleteChore.js`
- [x] 4.4 Create `server/src/db/actions/chores/completeChore.js`

## 5. Database — Completions Action

- [x] 5.1 Create `server/src/db/actions/completions/getCompletionsByDate.js`

## 6. Express Server & Middleware

- [x] 6.1 Create `server/src/middleware/cors.js`
- [x] 6.2 Create `server/src/middleware/json.js`
- [x] 6.3 Create `server/src/server.js` wiring middleware and all routes, initializing DB schema on startup

## 7. Express Routes (habits)

- [x] 7.1 Create `server/src/routes/habits/getHabits.js`
- [x] 7.2 Create `server/src/routes/habits/createHabit.js`
- [x] 7.3 Create `server/src/routes/habits/deleteHabit.js`
- [x] 7.4 Create `server/src/routes/habits/completeHabit.js`

## 8. Express Routes (chores)

- [x] 8.1 Create `server/src/routes/chores/getChores.js`
- [x] 8.2 Create `server/src/routes/chores/createChore.js`
- [x] 8.3 Create `server/src/routes/chores/deleteChore.js`
- [x] 8.4 Create `server/src/routes/chores/completeChore.js`

## 9. Express Routes (completions)

- [x] 9.1 Create `server/src/routes/completions/getCompletions.js`

## 10. Client — Styles

- [x] 10.1 Create `client/src/styles/variables.css` with color and spacing tokens
- [x] 10.2 Create `client/src/styles/global.css` with base resets and typography

## 11. Client — UI Components

- [x] 11.1 Create `client/src/components/ui/Button/Button.jsx` and `Button.css`
- [x] 11.2 Create `client/src/components/ui/Checkbox/Checkbox.jsx` and `Checkbox.css`
- [x] 11.3 Create `client/src/components/ui/Badge/Badge.jsx` and `Badge.css`

## 12. Client — Habit Components

- [x] 12.1 Create `client/src/components/habits/HabitCard/HabitCard.jsx` and `HabitCard.css`
- [x] 12.2 Create `client/src/components/habits/HabitCard/HabitCard.test.jsx` (demo: renders name, checkbox fires callback)
- [x] 12.3 Create `client/src/components/habits/HabitList/HabitList.jsx` and `HabitList.css`
- [x] 12.4 Create `client/src/components/habits/HabitForm/HabitForm.jsx` and `HabitForm.css`

## 13. Client — Chore Components

- [x] 13.1 Create `client/src/components/chores/ChoreCard/ChoreCard.jsx` and `ChoreCard.css`
- [x] 13.2 Create `client/src/components/chores/ChoreList/ChoreList.jsx` and `ChoreList.css`
- [x] 13.3 Create `client/src/components/chores/ChoreForm/ChoreForm.jsx` and `ChoreForm.css`

## 14. Client — API Layer

- [x] 14.1 Create `client/src/api/habits/getHabits.js`
- [x] 14.2 Create `client/src/api/habits/createHabit.js`
- [x] 14.3 Create `client/src/api/habits/deleteHabit.js`
- [x] 14.4 Create `client/src/api/habits/completeHabit.js`
- [x] 14.5 Create `client/src/api/chores/getChores.js`
- [x] 14.6 Create `client/src/api/chores/createChore.js`
- [x] 14.7 Create `client/src/api/chores/deleteChore.js`
- [x] 14.8 Create `client/src/api/chores/completeChore.js`

## 15. Client — Hooks

- [x] 15.1 Create `client/src/hooks/useHabits.js` and `useHabits.test.js` (skeleton)
- [x] 15.2 Create `client/src/hooks/useChores.js` and `useChores.test.js` (skeleton)
- [x] 15.3 Create `client/src/hooks/useCompletions.js`

## 16. Client — Views

- [x] 16.1 Create `client/src/views/DailyView/DailyView.jsx` and `DailyView.css`
- [x] 16.2 Create `client/src/views/WeeklyView/WeeklyView.jsx` and `WeeklyView.css`
- [x] 16.3 Create `client/src/views/HistoryView/HistoryView.jsx` and `HistoryView.css`

## 17. Client — App Shell

- [x] 17.1 Create `client/src/App.jsx` with tab-based navigation between views
- [x] 17.2 Create `client/src/main.jsx` importing `global.css` and mounting the app

## 18. First Step — Tailwind

- [x] 18.1 Add Tailwind and PostCSS dependencies to `client/package.json`
- [x] 18.2 Create `client/tailwind.config.js` and `client/postcss.config.js`
- [x] 18.3 Create `client/src/styles/tailwind.css` with `@tailwind` directives
- [x] 18.4 Import `tailwind.css` in `main.jsx` alongside `global.css`
- [x] 18.5 Rewrite `Badge.jsx` to use Tailwind utility classes (remove `Badge.css`)

## 19. First Step — Web Component

- [x] 19.1 Create `client/src/web-components/HabitCard/HabitCard.js` defining `<habit-card>` with Shadow DOM, named slots, and `habit-toggle` custom event
- [x] 19.2 Register `<habit-card>` in `main.jsx` via `customElements.define`
- [x] 19.3 Use `<habit-card>` inside `HabitList.jsx` with a `ref` to listen for `habit-toggle`

## 20. First Step — Drizzle

- [x] 20.1 Add Drizzle ORM and drizzle-kit dependencies to `server/package.json`
- [x] 20.2 Create `server/drizzle.config.js`
- [x] 20.3 Create `server/src/db/drizzle/schema.js` mirroring the `items` and `completions` tables
- [x] 20.4 Create `server/src/db/drizzle/client.js` wrapping the shared connection with `drizzle()`
- [x] 20.5 Create `server/src/db/drizzle/actions/habits/getAllHabits.js` using Drizzle query builder with date filter

## 21. First Step — tRPC

- [x] 21.1 Add tRPC dependencies (`@trpc/server`, `@trpc/client`, `zod`) to `server/package.json` and `client/package.json`
- [x] 21.2 Create `server/src/trpc/routers/habits/getAll.js` defining the `habits.getAll` query procedure
- [x] 21.3 Create `server/src/trpc/router.js` assembling the root router
- [x] 21.4 Create `server/src/trpc/server.js` as a standalone Express server on port 3002
- [x] 21.5 Add tRPC server start script to root `package.json` dev command

## 22. Playwright Skeleton

- [x] 22.1 Add Playwright dependency to root or `e2e/package.json`
- [x] 22.2 Create `e2e/playwright.config.js` pointing at `http://localhost:5173`
- [x] 22.3 Create `e2e/tests/daily-view.spec.js` (demo: navigate → assert habits visible → mark one complete → assert checked state)
