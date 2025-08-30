import db from './connection'

export interface UserData {
  id: number
  auth0_id: string
  email: string
  name: string
}

// get all users
export async function getAllUserData(): Promise<UserData[]> {
  return db<UserData>('users').select('id', 'auth0_id', 'email', 'name')
}

// get user by id
export async function getUserById(id: number): Promise<UserData | undefined> {
  return db('users')
    .where('id', id)
    .select('id', 'auth0_id', 'email', 'name')
    .first()
}

// add user + id auto generate by postgreSQL

export async function addUser(user: Omit<UserData, 'id'>): Promise<UserData> {
  const [newUser] = await db('users')
    .insert(user)
    .returning(['id', 'auth0_id', 'email', 'name'])

  return newUser
}

// update user

export async function updateUser(
  id: number,
  updatedUser: Partial<UserData>
): Promise<UserData | undefined> {
  const updatedCount = await db('users').where({ id }).update(updatedUser)

  if (updatedCount > 0) {
    return getUserById(id)
  }

  return undefined
}

// delete user by id

export async function deleteUser(id: number): Promise<void> {
  const userExists = await db('users').where('id', id).first()

  if (!userExists) {
    throw new Error('User not found')
  }

  await db('users').where('id', id).delete()
}
