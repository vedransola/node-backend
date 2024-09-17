import express from 'express'
import {
  getAllUsers,
  getUserById,
  getUsersByName,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user.controller'

const userRouter = express.Router()

userRouter.get('/', getAllUsers)
userRouter.get('/id/:id', getUserById)
userRouter.get('/firstname/:firstname', getUsersByName)
userRouter.post('/', createUser)
userRouter.put('/id/:id', updateUser)
userRouter.delete('/:id', deleteUser)

export default userRouter
