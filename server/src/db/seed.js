import db from './connection.js'

const habits = [
  { name: 'Morning run', frequency: 'daily' },
  { name: 'Read 30 minutes', frequency: 'daily' },
  { name: 'Meditate', frequency: 'daily' },
  { name: 'Weekly review', frequency: 'weekly' },
]

const chores = [
  { name: 'Wash dishes', frequency: 'daily' },
  { name: 'Take out trash', frequency: 'daily' },
  { name: 'Clean bathroom', frequency: 'weekly' },
  { name: 'Grocery shopping', frequency: 'weekly' },
]

const insert = db.prepare(
  'INSERT OR IGNORE INTO items (name, type, frequency) VALUES (?, ?, ?)'
)

const count = db.prepare('SELECT COUNT(*) as n FROM items').get()

if (count.n === 0) {
  habits.forEach(h => insert.run(h.name, 'habit', h.frequency))
  chores.forEach(c => insert.run(c.name, 'chore', c.frequency))
  console.log('Database seeded.')
}
