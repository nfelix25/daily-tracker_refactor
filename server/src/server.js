import express from 'express'
import { corsMiddleware } from './middleware/cors.js'
import { jsonMiddleware } from './middleware/json.js'
import { getHabits } from './routes/habits/getHabits.js'
import { postHabit } from './routes/habits/createHabit.js'
import { removeHabit } from './routes/habits/deleteHabit.js'
import { complete as completeHabit, uncomplete as uncompleteHabit } from './routes/habits/completeHabit.js'
import { getChores } from './routes/chores/getChores.js'
import { postChore } from './routes/chores/createChore.js'
import { removeChore } from './routes/chores/deleteChore.js'
import { complete as completeChore, uncomplete as uncompleteChore } from './routes/chores/completeChore.js'
import { getCompletions } from './routes/completions/getCompletions.js'

// Importing connection.js runs schema initialization as a side effect
import './db/connection.js'

const app = express()

app.use(corsMiddleware)
app.use(jsonMiddleware)

// Habits
app.get('/api/habits', getHabits)
app.post('/api/habits', postHabit)
app.delete('/api/habits/:id', removeHabit)
app.post('/api/habits/:id/complete', completeHabit)
app.delete('/api/habits/:id/complete', uncompleteHabit)

// Chores
app.get('/api/chores', getChores)
app.post('/api/chores', postChore)
app.delete('/api/chores/:id', removeChore)
app.post('/api/chores/:id/complete', completeChore)
app.delete('/api/chores/:id/complete', uncompleteChore)

// Completions
app.get('/api/completions', getCompletions)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on :${PORT}`))
