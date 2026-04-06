import { getAllChores } from '../../db/actions/chores/getAllChores.js'

export function getChores(req, res) {
  const { frequency, date } = req.query
  res.json(getAllChores({ frequency, date }))
}
