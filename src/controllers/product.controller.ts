import { Request, Response } from 'express'
import Product from '../models/product.model'

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export const getProductByName = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ name: req.params.name })
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Request body cannot be empty' })
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
