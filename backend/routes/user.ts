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

// add user
router.post('/', async (req, res) => {
  try {
    const { auth0_sub, email, name } = req.body
    if (!auth0_sub || !email || !name) {
      return res.status(400).send('Missing Required Fields! ')
    }
    const newUser = await UserDb.addUser({ auth0_sub, email, name })
    res.status(201).json(newUser)
  } catch (err) {
    console.error(err)
    res.status(500).send('Something has gone wrong adding a user!')
  }
})

// should allow partial updates

router.patch('/:id', async (req, res) => {
  try {
    const userId = Number(req.params.id)
    const updates: Partial<UserData> = req.body // only fields sent in body

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No fields provided for update' })
    }

    const updatedUser = await UserDb.updateUser(userId, updates)

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found - update failed' })
    }

    res.status(200).json(updatedUser)
  } catch (error) {
    console.error('Server error, could not update user', error)
    res.sendStatus(500)
  }
})


// DELETE /api/v1/users/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID' })
    }

    const deletedCount = await UserDb.deleteUser(id) // replace with actual DB call

    if (deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Resource not found' })
    }

    res.status(200).json({ success: true, message: `User ${id} deleted` })
  } catch (error) {
    console.error('Could not delete user:', error)
    res.status(500).json({ success: false, message: 'Server error, could not delete user' })
  }
})


export default router
