import { createChore } from '../../db/actions/chores/createChore.js'

export function postChore(req, res) {
  const { name, frequency } = req.body
  if (!name || !frequency) {
    return res.status(400).json({ error: 'name and frequency are required' })
  }
  res.status(201).json(createChore(name, frequency))
}
