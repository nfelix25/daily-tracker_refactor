import defaultDb from '../../connection.js'

export function addCompletion(itemId, date, db = defaultDb) {
  db.prepare('INSERT OR IGNORE INTO completions (item_id, completed_date) VALUES (?, ?)').run(
    itemId,
    date
  )
}

export function removeCompletion(itemId, date, db = defaultDb) {
  db.prepare('DELETE FROM completions WHERE item_id = ? AND completed_date = ?').run(
    itemId,
    date
  )
}
