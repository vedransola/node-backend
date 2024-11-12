import express from 'express'
import {
  getAllStories,
  getStory
} from '@/controllers/storyblok.controller'

const storyblokRouter = express.Router()

storyblokRouter.get('/stories', getAllStories)
storyblokRouter.get('/story/*', getStory)

export default storyblokRouter
