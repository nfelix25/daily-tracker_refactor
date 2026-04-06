## Context

Greenfield personal app built as a structured refactoring exercise. The initial stack (React/Express/SQLite/CSS) is intentionally chosen to be replaced incrementally by (Web Components/tRPC/Drizzle/Tailwind). The codebase must be designed so that any single file can be understood and migrated in isolation. There is no existing code to migrate; this is a clean start.

## Goals / Non-Goals

**Goals:**
- Build a working personal habit/chore tracker (daily + weekly views, completions, streaks)
- Structure every layer with extreme modularity — one file per route, db action, and component
- Embed working first-step migration examples that coexist with the initial stack
- Provide co-located Vitest unit tests and a Playwright e2e skeleton

**Non-Goals:**
- Production deployment, auth, multi-user support
- Full test coverage (skeleton + demo only)
- Completing any refactor (first steps are guides, not migrations)
- Complex UI/UX or data visualization

## Decisions

### 1. Single `items` table for habits and chores
**Decision**: One table with a `type` column (`habit | chore`) rather than two separate tables.
**Rationale**: The data shape is identical. Separate tables would duplicate every route and db action without adding refactoring surface area. A `type` column keeps the schema simple while still allowing each route/action to filter independently.
**Alternative considered**: Two tables (`habits`, `chores`) — rejected because it doubles boilerplate without teaching anything new.

### 2. Extreme modularity as primary structural constraint
**Decision**: One file per Express route, one file per db action, one folder per component (with co-located CSS and test). No barrel files.
**Rationale**: The goal is fine-grained refactoring. Each file must be a self-contained unit of migration. A developer should be able to pick up `server/src/db/actions/habits/getAllHabits.js` and migrate it to Drizzle without touching anything else.
**Alternative considered**: Grouped route files (all habit routes in one file) — rejected because it increases blast radius per refactor step.

### 3. First-step examples coexist in the same codebase
**Decision**: All four first-step examples live in the main branch alongside the original stack, not on separate branches.
**Rationale**: Branches require context-switching; coexistence demonstrates actual incremental migration. Each first step must be wired in and functional alongside its counterpart.
**Alternative considered**: Separate branches per refactor — rejected because it doesn't show coexistence, which is the hard part.

### 4. tRPC runs on a separate Express server (different port)
**Decision**: `server/src/trpc/server.js` is its own Express entry point on port 3002. The original Express server runs on port 3001.
**Rationale**: Mounting tRPC on the same Express app is the eventual goal, but for a first step, a separate server makes the boundary explicit and avoids middleware conflicts. The client calls `:3002` only for the tRPC demo procedure.
**Alternative considered**: Mount tRPC as middleware on the existing Express server — deferred to the actual migration, not the first step.

### 5. Drizzle wraps the same SQLite connection instance
**Decision**: `server/src/db/connection.js` exports a single `better-sqlite3` instance. `server/src/db/drizzle/client.js` imports and wraps it with `drizzle(db)`. Both raw and Drizzle actions use the same file.
**Rationale**: Avoids any locking or file contention. Makes it clear that Drizzle is a layer on top of the connection, not a replacement for it.

### 6. `<habit-card>` as the Web Component first step
**Decision**: Implement a `<habit-card>` custom element with Shadow DOM, slots, and custom events. It is rendered inside `HabitList.jsx` via React's JSX.
**Rationale**: Shows the three distinctive Web Component features (encapsulation, composition, native events) in a meaningful UI unit. React treats it as a plain HTML element and listens to its custom events via `ref` + `addEventListener`.

### 7. `Badge` as the Tailwind first step
**Decision**: `Badge.jsx` is styled with Tailwind utility classes instead of `Badge.css`. `tailwind.css` is imported alongside `global.css` in `main.jsx`.
**Rationale**: Badge is small, stateless, and used in multiple places — ideal contrast between a traditional CSS class and utility-first classes without obscuring the pattern with component complexity.

### 8. Co-located tests; Playwright in `e2e/`
**Decision**: Vitest test files live next to the file they test (e.g., `HabitCard.test.jsx` beside `HabitCard.jsx`). Playwright specs live in `e2e/tests/`.
**Rationale**: Co-location supports the modularity goal — each folder is self-contained. E2E tests span the whole app, so top-level placement is appropriate.

### 9. Simple monorepo — no workspaces
**Decision**: Root `package.json` contains only `concurrently` scripts. `client/` and `server/` each have their own `package.json`. No npm/pnpm workspaces.
**Rationale**: Eliminates devops friction (symlinks, hoisting, workspace protocol). Each package is independently installable.

## Risks / Trade-offs

- **Two servers in dev** → Two terminal processes (or concurrently). Mitigation: root `dev` script starts both with `concurrently`.
- **Tailwind PostCSS + Vite** → Minor config friction. Mitigation: well-documented; `@tailwindcss/vite` plugin handles it.
- **Web Components in React 18** → React 18 has limited custom event support; workaround via `ref` + `addEventListener` is idiomatic. Mitigation: documented in component file.
- **Over-modularity** → More files to navigate. Mitigation: this is intentional and the primary goal; directory structure is the navigation layer.
- **SQLite file access from two servers** → SQLite supports multiple readers; write conflicts are unlikely in single-user local dev. Mitigation: `better-sqlite3` is synchronous; no concurrent writes in practice.

## Open Questions

None. All decisions resolved during exploration.
