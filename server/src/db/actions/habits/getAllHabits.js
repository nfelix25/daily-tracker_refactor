import defaultDb from '../../connection.js'
import { computeStreak } from '../../utils/computeStreak.js'

export function getAllHabits({ frequency = null, date = null } = {}, db = defaultDb) {
  const today = date || new Date().toISOString().split('T')[0]

  let query = `
    SELECT
      i.*,
      COUNT(c.id) AS totalCompletions,
      MAX(CASE WHEN c.completed_date = ? THEN 1 ELSE 0 END) AS completedToday
    FROM items i
    LEFT JOIN completions c ON c.item_id = i.id
    WHERE i.type = 'habit'
  `
  const params = [today]

  if (frequency) {
    query += ' AND i.frequency = ?'
    params.push(frequency)
  }

  query += ' GROUP BY i.id ORDER BY i.created_at ASC'

  const rows = db.prepare(query).all(...params)

  return rows.map(row => {
    const dates = db
      .prepare('SELECT completed_date FROM completions WHERE item_id = ? ORDER BY completed_date DESC')
      .all(row.id)
      .map(r => r.completed_date)

    return {
      ...row,
      completedToday: Boolean(row.completedToday),
      streak: computeStreak(dates, row.frequency),
    }
  })
}
