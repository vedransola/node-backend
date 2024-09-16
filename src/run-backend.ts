import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

export function runBackend(routers: Array<{ path: string, router: express.Router }>) {
  // MongoDB connection setup
  const username = process.env.MONGODB_USERNAME
  const password = process.env.MONGODB_PASSWORD
  const database = process.env.MONGODB_DATABASE
  const appName = process.env.MONGODB_APPNAME
  const cluster = 'backenddb.la1fi.mongodb.net'
  const options = 'retryWrites=true&w=majority'
  const connectionString = `mongodb+srv://${username}:${password}@${cluster}/${database}?${options}&appName=${appName}`

  mongoose.connect(connectionString)
    .then(() => {
      console.log('Connected to the database')

      const app = express()

      const corsOptions = {
        origin: '*', // Allow all origins
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
      }

      app.use(cors(corsOptions))
      app.use(express.json())

      // Mount all routers passed in
      routers.forEach(({ path, router }) => {
        app.use(path, router)
      })

      const port = process.env.PORT || 3000
      app.listen(port, () => console.log(`Server is running on port ${port}...`))
    })
    .catch((error) => {
      console.log('Connection to the database failed:', (error as Error).message)
    })
}
