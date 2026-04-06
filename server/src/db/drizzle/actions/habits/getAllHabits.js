/**
 * [first-step: Drizzle] Same interface as db/actions/habits/getAllHabits.js.
 * Uses Drizzle query builder instead of raw SQL — swap the import in any route to migrate.
 *
 * Shows: Drizzle's select(), leftJoin(), where(), groupBy(), and sql`` template tag.
 */
import { eq, sql } from 'drizzle-orm'
import { drizzleDb } from '../../client.js'
import { items, completions } from '../../schema.js'

export function getAllHabits(date = new Date().toISOString().split('T')[0]) {
  return drizzleDb
    .select({
      id:             items.id,
      name:           items.name,
      type:           items.type,
      frequency:      items.frequency,
      createdAt:      items.createdAt,
      totalCompletions: sql`COUNT(${completions.id})`.as('totalCompletions'),
      completedToday:   sql`MAX(CASE WHEN ${completions.completedDate} = ${date} THEN 1 ELSE 0 END)`.as('completedToday'),
    })
    .from(items)
    .leftJoin(completions, eq(completions.itemId, items.id))
    .where(eq(items.type, 'habit'))
    .groupBy(items.id)
    .orderBy(items.createdAt)
    .all()
    .map(row => ({ ...row, completedToday: Boolean(row.completedToday) }))
}
