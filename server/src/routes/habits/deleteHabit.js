import { deleteHabit } from '../../db/actions/habits/deleteHabit.js'

export function removeHabit(req, res) {
  const changes = deleteHabit(Number(req.params.id))
  if (changes === 0) return res.status(404).json({ error: 'Habit not found' })
  res.sendStatus(204)
}
