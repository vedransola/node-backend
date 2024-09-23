import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const generateToken = (userId: string) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: '365d' })
  console.log(`Token for user ${userId}: ${token}`)
}

generateToken('vedran')
