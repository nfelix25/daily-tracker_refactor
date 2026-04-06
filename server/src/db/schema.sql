CREATE TABLE IF NOT EXISTS items (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  name      TEXT    NOT NULL,
  type      TEXT    NOT NULL CHECK(type IN ('habit', 'chore')),
  frequency TEXT    NOT NULL CHECK(frequency IN ('daily', 'weekly')),
  created_at TEXT   NOT NULL DEFAULT (date('now'))
);

CREATE TABLE IF NOT EXISTS completions (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  item_id        INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  completed_date TEXT    NOT NULL,
  UNIQUE(item_id, completed_date)
);
