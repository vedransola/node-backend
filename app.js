import express from 'express'
import mongoose from 'mongoose'
import Product from './models/product.model.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(express.json())

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get a product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get a product by ID
app.get('/api/products/name/:name', async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.params.name })
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create a new product
app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update a product
app.put('/api/products/:id', async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Request body cannot be empty' })
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

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
    const port = process.env.PORT || 3000
    app.listen(port, () => console.log(`Listening on port ${port}...`))
  })
  .catch((error) => {
    console.log('Connection to the database failed:', error.message)
  })
