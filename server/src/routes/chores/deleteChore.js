import { deleteChore } from '../../db/actions/chores/deleteChore.js'

export function removeChore(req, res) {
  const changes = deleteChore(Number(req.params.id))
  if (changes === 0) return res.status(404).json({ error: 'Chore not found' })
  res.sendStatus(204)
}
