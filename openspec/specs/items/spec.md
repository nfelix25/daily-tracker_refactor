## ADDED Requirements

### Requirement: Item data model
The system SHALL store trackable items in a single `items` table with fields: `id` (integer primary key), `name` (text, not null), `type` (text: `habit` or `chore`), `frequency` (text: `daily` or `weekly`), `created_at` (text, ISO date).

#### Scenario: Schema is initialized
- **WHEN** the server starts for the first time
- **THEN** the `items` table is created if it does not exist

### Requirement: Create item
The system SHALL allow creating a new habit or chore with a name, type, and frequency.

#### Scenario: Create a daily habit
- **WHEN** a POST request is made to `/api/habits` with `{ name, frequency: "daily" }`
- **THEN** a new item of type `habit` is inserted and returned with its generated id

#### Scenario: Create a weekly chore
- **WHEN** a POST request is made to `/api/chores` with `{ name, frequency: "weekly" }`
- **THEN** a new item of type `chore` is inserted and returned with its generated id

#### Scenario: Missing name is rejected
- **WHEN** a POST request is made without a `name` field
- **THEN** the server responds with 400 and an error message

### Requirement: List items by type
The system SHALL return all items filtered by type via separate endpoints for habits and chores.

#### Scenario: List habits
- **WHEN** a GET request is made to `/api/habits`
- **THEN** all items with `type = "habit"` are returned as a JSON array

#### Scenario: List chores
- **WHEN** a GET request is made to `/api/chores`
- **THEN** all items with `type = "chore"` are returned as a JSON array

### Requirement: Delete item
The system SHALL allow deleting an item by id. Deleting an item SHALL cascade-delete its completions.

#### Scenario: Delete existing item
- **WHEN** a DELETE request is made to `/api/habits/:id` or `/api/chores/:id`
- **THEN** the item and all its completions are removed, responding with 204

#### Scenario: Delete non-existent item
- **WHEN** a DELETE request is made for an id that does not exist
- **THEN** the server responds with 404
