import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import authenticateToken from './middlewares/authenticateToken'
import { connectMongoDB } from './config/mongodb-connection'
import { createPostgresPool } from './config/postgres-connection'

dotenv.config()

export function runBackend(routers: Array<{ path: string, router: express.Router }>) {
  // Create Express app
  const app = express()

  const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }

  app.use(authenticateToken)
  app.use(cors(corsOptions))
  app.use(express.json())

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

  const port = process.env.PORT || 3000
  app.listen(port, () => console.log(`Server is running on port ${port}...`))
}
