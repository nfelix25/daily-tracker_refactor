## ADDED Requirements

### Requirement: Display this week's items
The weekly view SHALL display all items with `frequency = "weekly"`, grouped by type (habits then chores), showing each item's name, current streak, and completion status for the current ISO week (Monday–Sunday).

#### Scenario: View loads with this week's habits and chores
- **WHEN** the user navigates to the weekly view
- **THEN** all weekly habits and chores are listed with name and streak

#### Scenario: Completed items are visually distinct
- **WHEN** an item has any completion record within the current week
- **THEN** the item is shown in a completed state

### Requirement: Toggle completion from weekly view
The user SHALL be able to mark or unmark any weekly item as complete for today's date directly from the weekly view.

#### Scenario: Mark weekly chore complete
- **WHEN** the user clicks the completion control on an incomplete weekly chore
- **THEN** a completion for today's date is created and the UI updates

#### Scenario: Unmark weekly chore
- **WHEN** the user clicks the completion control on an already-complete weekly chore
- **THEN** the most recent completion within the current week is removed and the UI updates

### Requirement: Empty state
The weekly view SHALL display a message when no weekly items exist.

#### Scenario: No weekly items
- **WHEN** the user navigates to the weekly view and there are no weekly items
- **THEN** an empty state message is shown
