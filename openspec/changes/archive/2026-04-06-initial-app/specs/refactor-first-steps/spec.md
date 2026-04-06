## ADDED Requirements

### Requirement: Web Component first step — `<habit-card>`
A `<habit-card>` custom element SHALL be defined in `client/src/web-components/HabitCard/HabitCard.js` using the native Web Components API. It SHALL use Shadow DOM for style encapsulation, named slots for content projection, and dispatch a custom `habit-toggle` event when the user interacts with it. It SHALL be used inside `HabitList.jsx` — rendered as a native HTML element within React JSX, with React listening to its custom event via a `ref`.

#### Scenario: Web component renders in React app
- **WHEN** the React app loads the daily or weekly view
- **THEN** at least one `<habit-card>` element is present in the DOM, rendered by `HabitList.jsx`

#### Scenario: Custom event fires on interaction
- **WHEN** the user interacts with the `<habit-card>` toggle control
- **THEN** a `habit-toggle` CustomEvent is dispatched with the item id in `event.detail`

#### Scenario: Shadow DOM encapsulates styles
- **WHEN** the app's global CSS changes
- **THEN** the styles inside `<habit-card>`'s shadow root are unaffected

### Requirement: Tailwind first step — `Badge` component
`Badge.jsx` SHALL be styled exclusively with Tailwind utility classes (no `Badge.css` file). `tailwind.css` SHALL be imported in `main.jsx` alongside `global.css`. Both stylesheets SHALL coexist without conflict. `tailwind.config.js` and `postcss.config.js` SHALL be present and configured.

#### Scenario: Badge renders with Tailwind classes
- **WHEN** a `<Badge>` component is rendered
- **THEN** the DOM element has Tailwind utility classes applied and is visually styled

#### Scenario: Other components retain CSS-based styles
- **WHEN** the app loads with both `global.css` and `tailwind.css` imported
- **THEN** components using CSS files (e.g., `Button.css`) render correctly alongside Tailwind-styled components

### Requirement: Drizzle first step — `getAllHabits` action
A Drizzle schema SHALL be defined in `server/src/db/drizzle/schema.js` mirroring the `items` table. A Drizzle client SHALL be exported from `server/src/db/drizzle/client.js` wrapping the same `better-sqlite3` connection from `server/src/db/connection.js`. A `getAllHabits` action SHALL be implemented in `server/src/db/drizzle/actions/habits/getAllHabits.js` using Drizzle's query builder with a `where` filter for today's date joined against completions. It SHALL return the same shape as the raw SQL equivalent.

#### Scenario: Drizzle action returns habits
- **WHEN** `getAllHabits` from the Drizzle actions folder is called
- **THEN** it returns an array of habit items from the database, identical in shape to the raw SQL version

#### Scenario: Drizzle and raw SQL actions coexist
- **WHEN** both `server/src/db/actions/habits/getAllHabits.js` and `server/src/db/drizzle/actions/habits/getAllHabits.js` are imported
- **THEN** both execute against the same SQLite file without error

### Requirement: tRPC first step — `habits.getAll` procedure
A tRPC router SHALL be defined in `server/src/trpc/router.js` with a `habits.getAll` query procedure. A standalone Express server SHALL serve the tRPC router at `server/src/trpc/server.js` on a separate port (default 3002). The client SHALL be able to call `habits.getAll` and receive the same data as the REST `GET /api/habits` endpoint. `drizzle.config.js` SHALL be present at `server/drizzle.config.js`.

#### Scenario: tRPC server responds to habits.getAll
- **WHEN** a tRPC client calls `habits.getAll`
- **THEN** the procedure returns all habit items from the database

#### Scenario: tRPC and REST servers coexist
- **WHEN** both `server/src/server.js` (port 3001) and `server/src/trpc/server.js` (port 3002) are running
- **THEN** both respond correctly to their respective endpoints without conflict

### Requirement: Vitest skeleton with demo tests
Co-located Vitest test files SHALL exist alongside key source files. A demo test SHALL exist for `HabitCard.test.jsx` (renders and fires callback) and `getAllHabits.test.js` (db action with in-memory SQLite). Remaining test files SHALL be skeleton files with a single pending/skipped test as a placeholder.

#### Scenario: Demo tests pass
- **WHEN** `vitest run` is executed in `client/` or `server/`
- **THEN** the demo tests pass (or skip gracefully for skeletons)

### Requirement: Playwright skeleton with demo spec
A Playwright config SHALL exist at `e2e/playwright.config.js`. A demo spec SHALL exist at `e2e/tests/daily-view.spec.js` covering: navigate to daily view → assert habits are visible → mark one habit complete → assert completed state.

#### Scenario: Playwright demo spec executes
- **WHEN** `playwright test` is run with both servers running
- **THEN** the daily-view spec completes (pass or explicit skip if servers are not running)
