import defaultDb from '../../connection.js'

export function deleteHabit(id, db = defaultDb) {
  const result = db
    .prepare("DELETE FROM items WHERE id = ? AND type = 'habit'")
    .run(id)
  return result.changes
}
