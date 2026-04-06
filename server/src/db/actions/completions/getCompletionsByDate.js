import defaultDb from '../../connection.js'

export function getCompletionsByDate(date = null, db = defaultDb) {
  const query = `
    SELECT c.id, c.item_id, c.completed_date, i.name, i.type, i.frequency
    FROM completions c
    JOIN items i ON i.id = c.item_id
  `

  if (date) {
    return db
      .prepare(query + ' WHERE c.completed_date = ? ORDER BY c.id DESC')
      .all(date)
  }

  return db
    .prepare(query + ' ORDER BY c.completed_date DESC, c.id DESC')
    .all()
}
