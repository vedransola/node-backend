import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import rateLimit from 'express-rate-limit'
import authenticateToken from './middlewares/authenticateToken'
import { connectMongoDB } from './config/mongodb-connection'
import { createPostgresPool } from './config/postgres-connection'

dotenv.config()

export function runBackend(routers: Array<{ path: string, router: express.Router }>) {
  const app = express()

  const corsOptions = {
    origin: '*', // Allow all origins (for development purposes)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }

  app.use(cors(corsOptions))

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.'
  })

  app.use(limiter)

  app.use(express.json())
  app.use(authenticateToken)

  // Connect to MongoDB
  connectMongoDB()
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection failed:', error.message))

  // Connect to PostgreSQL
  const pgPool = createPostgresPool()
  pgPool.connect()
    .then((client) => {
      console.log('Connected to PostgreSQL')
      client.release() // Release client back to pool
    })
    .catch((error) => console.error('PostgreSQL connection failed:', error.message))

  // Mount all routers passed in
  routers.forEach(({ path, router }) => {
    app.use(path, router)
  })

  const port = process.env.PORT || 8000
  app.listen(port, () => console.log(`Server is running on port ${port}...`))
}
