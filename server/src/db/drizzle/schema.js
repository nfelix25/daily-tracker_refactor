/**
 * [first-step: Drizzle] Schema mirroring schema.sql.
 * Defines the same tables using Drizzle's schema builder.
 * Used by drizzle/client.js which wraps the shared SQLite connection.
 */
import { sqliteTable, integer, text, unique } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const items = sqliteTable('items', {
  id:        integer('id').primaryKey({ autoIncrement: true }),
  name:      text('name').notNull(),
  type:      text('type').notNull(),
  frequency: text('frequency').notNull(),
  createdAt: text('created_at').notNull().default(sql`(date('now'))`),
})

export const completions = sqliteTable(
  'completions',
  {
    id:            integer('id').primaryKey({ autoIncrement: true }),
    itemId:        integer('item_id').notNull().references(() => items.id, { onDelete: 'cascade' }),
    completedDate: text('completed_date').notNull(),
  },
  t => ({ uniqueItemDate: unique().on(t.itemId, t.completedDate) })
)
