/**
 * [first-step: tRPC] habits.getAll procedure.
 * Mirrors GET /api/habits — same data, type-safe RPC instead of REST.
 * To migrate: replace the /api/habits route import with this procedure.
 */
import { publicProcedure } from '../../init.js'
import { getAllHabits } from '../../../db/actions/habits/getAllHabits.js'

export const getAll = publicProcedure.query(() => {
  return getAllHabits()
})
