import { Request, Response } from 'express'
import StoryblokClient from 'storyblok-js-client'

const storyblokToken = process.env.STORYBLOK_TOKEN
if (!storyblokToken) {
  throw new Error('Missing STORYBLOK_TOKEN in environment variables')
}

const Storyblok = new StoryblokClient({
  accessToken: storyblokToken
})

interface StoryblokResponse<T> {
  story: T
}

interface Story {
  name: string
  content: object
}

export const getHome = async (req: Request, res: Response) => {
  try {
    const response = await Storyblok.get(`cdn/stories/home`, {
      version: 'draft',
    })

    const story = response.data as StoryblokResponse<Story>
    res.status(200).json(story?.story)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export const getStory = async (req: Request, res: Response) => {
  const url = req.params[0]

  try {
    const response = await Storyblok.get(`cdn/stories/${url}`, {
      version: 'draft',
    })

    const story = response.data as StoryblokResponse<Story>
    res.status(200).json(story?.story)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
