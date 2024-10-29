import { Request, Response } from 'express'
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
  content: any,
  full_slug: string
}

interface StoryblokListResponse<T> {
  stories: T[]
}

export const getAllStories = async (req: Request, res: Response) => {
  try {
    const response = await Storyblok.get('cdn/stories', {
      version: 'draft'
    })

    const allStories = response.data.stories as Story[]

    const filteredStories = allStories.filter(story => !story.full_slug.startsWith('shared-content/'))

    res.status(200).json(filteredStories)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export const getStory = async (req: Request, res: Response) => {
  const { url } = req.params

  try {
    const response = await Storyblok.get(`cdn/stories/${url}`, {
      version: 'draft'
    })

    const story = response.data as { story: Story }

    res.status(200).json(story.story)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
