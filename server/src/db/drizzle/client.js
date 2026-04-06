/**
 * [first-step: Drizzle] Drizzle client wrapping the shared better-sqlite3 connection.
 * Both this client and raw SQL actions (db/actions/) operate on the same file.
 * Swap raw actions for Drizzle actions one file at a time.
 */
import { drizzle } from 'drizzle-orm/better-sqlite3'
import db from '../connection.js'
import * as schema from './schema.js'

export const drizzleDb = drizzle(db, { schema })
