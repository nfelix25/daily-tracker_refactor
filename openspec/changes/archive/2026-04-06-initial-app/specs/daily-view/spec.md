## ADDED Requirements

### Requirement: Display today's items
The daily view SHALL display all items with `frequency = "daily"`, grouped by type (habits then chores), showing each item's name, current streak, and completion status for today.

#### Scenario: View loads with today's habits and chores
- **WHEN** the user navigates to the daily view
- **THEN** all daily habits and chores are listed with their name and streak

#### Scenario: Completed items are visually distinct
- **WHEN** an item has a completion record for today's date
- **THEN** the item is shown in a completed state (checked checkbox, distinct styling)

### Requirement: Toggle completion from daily view
The user SHALL be able to mark or unmark any item as complete for today directly from the daily view.

#### Scenario: Mark habit complete
- **WHEN** the user clicks the completion control on an incomplete daily habit
- **THEN** the item is marked complete for today and the UI updates without a full page reload

#### Scenario: Unmark habit complete
- **WHEN** the user clicks the completion control on an already-complete daily habit
- **THEN** the completion is removed and the UI reflects the incomplete state

### Requirement: Empty state
The daily view SHALL display a message when no daily items exist.

#### Scenario: No daily items
- **WHEN** the user navigates to the daily view and there are no daily items
- **THEN** an empty state message is shown prompting the user to add items
