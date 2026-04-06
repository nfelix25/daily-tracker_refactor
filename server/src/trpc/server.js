/**
 * [first-step: tRPC] Standalone Express server for tRPC on port 3002.
 * Runs alongside the REST server (port 3001) — both access the same SQLite file.
 * Eventually: mount tRPC as middleware on the main Express server and remove this file.
 */
import express from 'express'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { appRouter } from './router.js'
import { corsMiddleware } from '../middleware/cors.js'

// Ensure DB schema is initialized
import '../db/connection.js'

const app = express()

app.use(corsMiddleware)
app.use('/trpc', createExpressMiddleware({ router: appRouter }))

const PORT = process.env.TRPC_PORT || 3002
app.listen(PORT, () => console.log(`tRPC server running on :${PORT}`))
