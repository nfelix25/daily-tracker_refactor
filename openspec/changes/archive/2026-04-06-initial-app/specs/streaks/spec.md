## ADDED Requirements

### Requirement: Current streak computation
The system SHALL compute the current streak for an item as the number of consecutive periods (days for daily items, weeks for weekly items) ending on or including today where a completion exists. Streaks SHALL be computed on-the-fly from the `completions` table, not stored.

#### Scenario: Daily item completed every day this week
- **WHEN** streak is requested for a daily item completed on each of the last 5 consecutive days
- **THEN** the streak value returned is 5

#### Scenario: Streak broken by a missed day
- **WHEN** a daily item was completed 3 days ago and today but not yesterday
- **THEN** the current streak is 1 (only today counts)

#### Scenario: New item with no completions
- **WHEN** streak is requested for an item with zero completions
- **THEN** the streak value returned is 0

### Requirement: Streak included in item listings
The system SHALL include the current streak value when returning items for the daily and weekly views.

#### Scenario: Streak returned with habit list
- **WHEN** a GET request is made to `/api/habits`
- **THEN** each item in the response includes a `streak` field with the current streak count

### Requirement: Total completions stat
The system SHALL include the total number of completions for each item alongside streak data.

#### Scenario: Total completions returned with item
- **WHEN** a GET request is made to `/api/habits` or `/api/chores`
- **THEN** each item includes a `totalCompletions` field with the count of all completion records for that item
