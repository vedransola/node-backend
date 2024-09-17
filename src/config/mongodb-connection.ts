import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export function connectMongoDB() {
  const mongoUsername = process.env.MONGODB_USERNAME
  const mongoPassword = process.env.MONGODB_PASSWORD
  const mongoDatabase = process.env.MONGODB_DATABASE
  const mongoAppName = process.env.MONGODB_APPNAME
  const mongoCluster = 'backenddb.la1fi.mongodb.net'
  const mongoOptions = 'retryWrites=true&w=majority'
  const mongoConnectionString = `mongodb+srv://${mongoUsername}:${mongoPassword}@${mongoCluster}/${mongoDatabase}?${mongoOptions}&appName=${mongoAppName}`

  return mongoose.connect(mongoConnectionString)
}
