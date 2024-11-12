import express from 'express'
import {
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct
} from '@/controllers/product.controller'

const productRouter = express.Router()

productRouter.get('/', getAllProducts)
productRouter.get('/:id', getProductById)
productRouter.get('/name/:name', getProductByName)
productRouter.post('/', createProduct)
productRouter.put('/:id', updateProduct)
productRouter.delete('/:id', deleteProduct)

export default productRouter
