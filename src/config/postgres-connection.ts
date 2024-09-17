import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export function createPostgresPool() {
  return new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10)
  })
}
