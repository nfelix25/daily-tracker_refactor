import { addCompletion, removeCompletion } from '../../db/actions/habits/completeHabit.js'

export function complete(req, res) {
  const { date } = req.body
  if (!date) return res.status(400).json({ error: 'date is required' })
  addCompletion(Number(req.params.id), date)
  res.status(201).json({ ok: true })
}

export function uncomplete(req, res) {
  const { date } = req.body
  if (!date) return res.status(400).json({ error: 'date is required' })
  removeCompletion(Number(req.params.id), date)
  res.sendStatus(204)
}
