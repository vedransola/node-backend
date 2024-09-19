import express from 'express'
import { runBackend } from './run-backend'
import productRouter from './routes/product.route'
import userRouter from './routes/user.route'
import authenticateToken from './middlewares/authenticateToken'

const protectedProductRouter = express.Router()
protectedProductRouter.use(authenticateToken)
protectedProductRouter.use([productRouter])

const protectedUserRouter = express.Router()
protectedUserRouter.use(authenticateToken)
protectedUserRouter.use([userRouter])

runBackend([
  {
    path: '/api/products',
    router: protectedProductRouter
  },
  {
    path: '/api/users',
    router: protectedUserRouter
  }
])
