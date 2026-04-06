/** @type {import('drizzle-kit').Config} */
export default {
  schema: './src/db/drizzle/schema.js',
  out: './src/db/drizzle/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: './tracker.db',
  },
}
