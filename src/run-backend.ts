import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { connectMongoDB } from './config/mongodb-connection'

dotenv.config()

export function runBackend(routers: Array<{ path: string, router: express.Router }>) {
  // Create Express app
  const app = express()

  const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }

  app.use(cors(corsOptions))
  app.use(express.json())

  // Connect to MongoDB
  connectMongoDB()
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection failed:', error.message))

  // Mount all routers passed in
  routers.forEach(({ path, router }) => {
    app.use(path, router)
  })

  const port = process.env.PORT || 3000
  app.listen(port, () => console.log(`Server is running on port ${port}...`))
}
