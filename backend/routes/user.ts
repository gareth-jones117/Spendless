import { Router } from 'express'
import * as UserDb from '../db/userdb'
import { UserData } from '../db/userdb'

const router = Router()

// GET /api/v1/users  -- all users
router.get('/', async (req, res) => {
  try {
    const users: UserData[] = await UserDb.getAllUserData()
    res.status(200).json(users)
  } catch (err) {
    console.error(err)
    res.status(500).send('Something has gone wrong')
  }
})

// GET /api/v1/users/:id -- user by ID
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const user = await UserDb.getUserById(id)

    if (!user) {
      return res.status(404).send('User not found')
    }

    res.status(200).json(user)
  } catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong')
  }
})

export default router
