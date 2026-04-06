import defaultDb from '../../connection.js'

export function deleteChore(id, db = defaultDb) {
  const result = db
    .prepare("DELETE FROM items WHERE id = ? AND type = 'chore'")
    .run(id)
  return result.changes
}
