import { runBackend } from './run-backend'
import productRouter from './routes/product.route'
import userRouter from './routes/user.route'

runBackend([
  {
    path: '/api/products',
    router: productRouter
  },
  {
    path: '/api/users',
    router: userRouter
  }
])
