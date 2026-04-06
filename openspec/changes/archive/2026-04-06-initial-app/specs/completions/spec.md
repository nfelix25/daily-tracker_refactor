## ADDED Requirements

### Requirement: Completion data model
The system SHALL store completions in a `completions` table with fields: `id` (integer primary key), `item_id` (integer FK → items.id), `completed_date` (text, ISO date `YYYY-MM-DD`). A given item SHALL have at most one completion per date (unique constraint on `item_id, completed_date`).

#### Scenario: Schema is initialized
- **WHEN** the server starts for the first time
- **THEN** the `completions` table is created with the unique constraint on `(item_id, completed_date)`

### Requirement: Mark item complete
The system SHALL allow marking an item as complete for a specific date.

#### Scenario: Complete a habit today
- **WHEN** a POST request is made to `/api/habits/:id/complete` with `{ date: "YYYY-MM-DD" }`
- **THEN** a completion record is inserted for that item and date, returning 201

#### Scenario: Duplicate completion is a no-op
- **WHEN** a POST request is made to complete an item on a date it is already completed
- **THEN** the server responds with 200 (idempotent, no error)

### Requirement: Unmark item complete
The system SHALL allow removing a completion for an item on a specific date.

#### Scenario: Unmark a habit
- **WHEN** a DELETE request is made to `/api/habits/:id/complete` with `{ date: "YYYY-MM-DD" }`
- **THEN** the completion record for that item and date is removed, responding with 204

#### Scenario: Unmark non-existent completion is a no-op
- **WHEN** a DELETE request is made to unmark a completion that does not exist
- **THEN** the server responds with 204 (idempotent)

### Requirement: Query completions by date
The system SHALL return all completions for a given date, joined with item data.

#### Scenario: Get today's completions
- **WHEN** a GET request is made to `/api/completions?date=YYYY-MM-DD`
- **THEN** all completion records for that date are returned, including item name, type, and frequency
