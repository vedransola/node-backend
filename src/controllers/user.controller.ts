import { Request, Response } from 'express'
import { createPostgresPool } from '@/config/postgres-connection'
import { User, buildUpdateQuery } from '@/helpers/queryBuilder'

const pool = createPostgresPool()

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT *
      FROM users
      ORDER BY id
    `

    const result = await pool.query(query)
    res.status(200).json({ users: result.rows})
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const query = {
      text: `
        SELECT *
        FROM users
        WHERE id = $1
        LIMIT 1
      `,
      values: [id]
    }

    const result = await pool.query(query)
    res.status(200).json(result.rows?.[0])
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export const getUsersByFirstName = async (req: Request, res: Response) => {
  const { firstname } = req.params

  try {
    const query = {
      text: `
        SELECT *
        FROM users
        WHERE firstname = $1
      `,
      values: [firstname]
    }

    const result = await pool.query(query)
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export const getUsersByLastName = async (req: Request, res: Response) => {
  const { lastname } = req.params

  try {
    const query = {
      text: `
        SELECT *
        FROM users
        WHERE lastname = $1
      `,
      values: [lastname]
    }

    const result = await pool.query(query)
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export const createUser = async (req: Request, res: Response) => {
  const { firstname, lastname, email, age } = req.body

  try {
    const query = {
      text: `
        INSERT INTO users (firstname, lastname, email, age)
        VALUES($1, $2, $3, $4)
        RETURNING *
      `,
      values: [firstname, lastname, email, age]
    }

    const result = await pool.query(query)
    res.status(201).json(result.rows)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const data: Partial<User> = req.body

  if (!id) {
    return res.status(400).json({ message: 'ID is required' })
  }

  const { query, values } = buildUpdateQuery('users', data, id)

  if (!query) {
    return res.status(400).json({ message: 'No fields to update' })
  }

  try {
    const result = await pool.query({ text: query, values })
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const query = {
      text: `
        DELETE FROM users
        WHERE id = $1
        RETURNING *
      `,
      values: [id]
    }

    const result = await pool.query(query)

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
