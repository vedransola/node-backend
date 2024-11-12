import { Request, Response } from 'express'
import Joi from 'joi'
import { isProduction } from '@/helpers/envUtils'
import StoryblokClient from 'storyblok-js-client'

const storyblokToken = process.env.STORYBLOK_TOKEN
if (!storyblokToken) {
  throw new Error('Missing STORYBLOK_TOKEN in environment variables')
}

const Storyblok = new StoryblokClient({
  accessToken: storyblokToken
})

interface Story {
  name: string
  content: any
  full_slug: string
}

const version = isProduction() ? 'published' : 'draft'

export const getAllStories = async (_: Request, res: Response) => {
  try {
    const response = await Storyblok.get('cdn/stories', {
      version
    })

    const allStories = response.data.stories as Story[]

    const filteredStories = allStories.filter(story => !story.full_slug.startsWith('shared-content/'))

    res.status(200).json(filteredStories)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export const getStory = async (req: Request, res: Response) => {
  const urlSchema = Joi.alternatives().try(
    Joi.string().min(1).required(),
    Joi.number().min(1).required()
  )

  const { error } = urlSchema.validate(req.params[0])

  if (error) {
    return res.status(400).json({ message: 'Invalid URL parameter' })
  }

  const url = req.params[0]

  try {
    const response = await Storyblok.get(`cdn/stories/${url}`, {
      version
    })

    const story = response.data as { story: Story }

    res.status(200).json(story.story)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
