## ADDED Requirements

### Requirement: Display completion history
The history view SHALL display past completions in reverse chronological order, grouped by date. Each entry SHALL show the item name, type, and the completion date.

#### Scenario: History view shows past completions
- **WHEN** the user navigates to the history view
- **THEN** all completions are shown grouped by date, most recent first

#### Scenario: Empty history
- **WHEN** no completions exist
- **THEN** the history view shows an empty state message

### Requirement: History is read-only
The history view SHALL NOT allow toggling or modifying completions. It is a display-only view.

#### Scenario: No interactive completion controls in history
- **WHEN** the user views the history
- **THEN** there are no checkboxes or buttons to mark/unmark items
