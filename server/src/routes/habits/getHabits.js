import { getAllHabits } from '../../db/actions/habits/getAllHabits.js'

export function getHabits(req, res) {
  const { frequency, date } = req.query
  res.json(getAllHabits({ frequency, date }))
}
