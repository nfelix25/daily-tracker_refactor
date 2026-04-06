/**
 * [first-step: tRPC] Root router assembling all procedure routers.
 * Add new routers here as you migrate each REST endpoint.
 */
import { router } from './init.js'
import { getAll } from './routers/habits/getAll.js'

export const appRouter = router({
  habits: router({ getAll }),
})

/** @typedef {typeof appRouter} AppRouter */
