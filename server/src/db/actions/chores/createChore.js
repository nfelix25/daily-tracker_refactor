import defaultDb from '../../connection.js'

export function createChore(name, frequency, db = defaultDb) {
  const result = db
    .prepare("INSERT INTO items (name, type, frequency) VALUES (?, 'chore', ?)")
    .run(name, frequency)

  return db.prepare('SELECT * FROM items WHERE id = ?').get(result.lastInsertRowid)
}
