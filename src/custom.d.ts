import 'express'

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

console.log('Custom type definitions loaded.')
