/**
 * tRPC initialization. Defines the shared `t` instance.
 * Imported by router.js and procedure files — avoids circular deps.
 */
import { initTRPC } from '@trpc/server'

const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure
