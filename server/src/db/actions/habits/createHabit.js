import defaultDb from '../../connection.js'

export function createHabit(name, frequency, db = defaultDb) {
  const result = db
    .prepare("INSERT INTO items (name, type, frequency) VALUES (?, 'habit', ?)")
    .run(name, frequency)

  return db.prepare('SELECT * FROM items WHERE id = ?').get(result.lastInsertRowid)
}
