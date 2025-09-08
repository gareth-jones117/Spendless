import db from './connection'

export interface UserData {
  id: number
  auth0_sub: string
  email: string
  name: string
}

// get all users
export async function getAllUserData(): Promise<UserData[]> {
  return db<UserData>('users').select('id', 'auth0_sub', 'email', 'name')
}

// get user by id
export async function getUserById(id: number): Promise<UserData | undefined> {
  return db('users')
    .where('id', id)
    .select('id', 'auth0_sub', 'email', 'name')
    .first()
}

// add user + id auto generate by postgreSQL

export async function addUser(user: Omit<UserData, 'id'>): Promise<UserData> {
  const [newUser] = await db('users')
    .insert(user)
    .returning(['id', 'auth0_sub', 'email', 'name'])

  return newUser
}

// update user

export async function updateUser(id: number, updates: Partial<UserData>) {
  const [updated] = await db('users')
    .where({ id })
    .update(updates)
    .returning('*')

  return updated
}

// delete user by id

export async function deleteUser(id: number): Promise<number> {
  return await db('users').where({ id }).del()
}
