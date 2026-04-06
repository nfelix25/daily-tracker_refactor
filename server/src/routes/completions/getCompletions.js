import { getCompletionsByDate } from '../../db/actions/completions/getCompletionsByDate.js'

export function getCompletions(req, res) {
  const { date } = req.query
  res.json(getCompletionsByDate(date || null))
}
