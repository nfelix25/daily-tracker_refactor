import { createHabit } from '../../db/actions/habits/createHabit.js'

export function postHabit(req, res) {
  const { name, frequency } = req.body
  if (!name || !frequency) {
    return res.status(400).json({ error: 'name and frequency are required' })
  }
  res.status(201).json(createHabit(name, frequency))
}
