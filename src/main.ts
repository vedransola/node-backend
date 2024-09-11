import { runBackend } from './run-backend'
import productRouter from './controller/product'

runBackend([
  {
    path: '/api/products',
    router: productRouter
  }
])
