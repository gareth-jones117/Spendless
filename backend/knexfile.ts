import type { Knex } from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const config: Knex.Config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
  pool: {
    min: 2,
    max: 10,
  },
}

export default config
