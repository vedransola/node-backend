import express from 'express'
import { getHome, getStory } from '../controllers/storyblok.controller'

const storyblokRouter = express.Router()

storyblokRouter.get('/', getHome)
storyblokRouter.get('/:url', getStory)

export default storyblokRouter
