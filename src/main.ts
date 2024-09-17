import { runBackend } from './run-backend'
import productRouter from './routes/product.route'

runBackend([
  {
    path: '/api/products',
    router: productRouter
  }
])
