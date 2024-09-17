export interface User {
  id: number
  firstname: string
  lastname: string
  email: string
  age?: number
}

export function buildUpdateQuery(table: string, data: Partial<User>, id: number) {
  const setClauses = []
  const values = []

  let index = 1
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      setClauses.push(`${key} = $${index}`)
      values.push(value)
      index++
    }
  }

  if (setClauses.length === 0) {
    return { query: '', values: [] }
  }

  const query = `
    UPDATE ${table}
    SET ${setClauses.join(', ')}
    WHERE id = $${index}
    RETURNING *
  `
  values.push(id)

  return { query, values }
}
