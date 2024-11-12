import express from 'express'
import 'tsconfig-paths/register'
import { runBackend } from '@/run-backend'
import productRouter from '@/routes/product.route'
import storyblokRouter from '@/routes/storyblok.route'
import userRouter from '@/routes/user.route'
import authenticateToken from '@/middlewares/authenticateToken'

const protectedProductRouter = express.Router()
protectedProductRouter.use(authenticateToken)
protectedProductRouter.use([productRouter])

const protectedStoryblokRouter = express.Router()
protectedStoryblokRouter.use(authenticateToken)
protectedStoryblokRouter.use([storyblokRouter])

const protectedUserRouter = express.Router()
protectedUserRouter.use(authenticateToken)
protectedUserRouter.use([userRouter])

runBackend([
  {
    path: '/api/products',
    router: protectedProductRouter
  },
  {
    path: '/api/storyblok',
    router: protectedStoryblokRouter
  },
  {
    path: '/api/users',
    router: protectedUserRouter
  }
])
