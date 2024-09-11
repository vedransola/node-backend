import mongoose, { Document, Schema } from 'mongoose'

interface IProduct extends Document {
  name: string
  quantity: number
  price: number
  image?: string
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a product name']
    },
    quantity: {
      type: Number,
      required: [true, 'Please enter a quantity']
    },
    price: {
      type: Number,
      required: [true, 'Please enter a price']
    },
    image: {
      type: String,
      required: false,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model<IProduct>('Product', ProductSchema)

export default Product
