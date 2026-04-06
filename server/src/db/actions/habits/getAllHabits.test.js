import Database from 'better-sqlite3'
import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import { getAllHabits } from './getAllHabits.js'
import { addCompletion } from './completeHabit.js'

const testDb = new Database(':memory:')

beforeAll(() => {
  testDb.exec(`
    CREATE TABLE items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      frequency TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (date('now'))
    );
    CREATE TABLE completions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
      completed_date TEXT NOT NULL,
      UNIQUE(item_id, completed_date)
    );
  `)
  testDb.pragma('foreign_keys = ON')
})

beforeEach(() => {
  testDb.exec('DELETE FROM completions; DELETE FROM items;')
})

describe('getAllHabits', () => {
  it('returns empty array when no habits exist', () => {
    expect(getAllHabits({}, testDb)).toEqual([])
  })

  it('returns habits with streak 0 and totalCompletions 0 when no completions', () => {
    testDb
      .prepare("INSERT INTO items (name, type, frequency) VALUES ('Morning run', 'habit', 'daily')")
      .run()

    const habits = getAllHabits({}, testDb)

    expect(habits).toHaveLength(1)
    expect(habits[0].name).toBe('Morning run')
    expect(habits[0].streak).toBe(0)
    expect(habits[0].totalCompletions).toBe(0)
    expect(habits[0].completedToday).toBe(false)
  })

  it('reflects completedToday when a completion exists for the given date', () => {
    const row = testDb
      .prepare("INSERT INTO items (name, type, frequency) VALUES ('Read', 'habit', 'daily')")
      .run()

    const date = '2024-06-01'
    addCompletion(row.lastInsertRowid, date, testDb)

    const habits = getAllHabits({ date }, testDb)

    expect(habits[0].completedToday).toBe(true)
    expect(habits[0].totalCompletions).toBe(1)
  })

  it('filters by frequency', () => {
    testDb
      .prepare("INSERT INTO items (name, type, frequency) VALUES ('Daily habit', 'habit', 'daily')")
      .run()
    testDb
      .prepare("INSERT INTO items (name, type, frequency) VALUES ('Weekly habit', 'habit', 'weekly')")
      .run()

    const daily = getAllHabits({ frequency: 'daily' }, testDb)
    expect(daily).toHaveLength(1)
    expect(daily[0].name).toBe('Daily habit')
  })
})
