import { Router } from 'express'
import { BudgetData } from '../db/budgetdb'
import * as BudgetDb from '../db/budgetdb'

const router = Router()

// GET /api/v1/budgets -- all expenses
router.get('/', async (req, res) => {
  try {
    const budgets: BudgetData[] = await BudgetDb.getAllBudgetData()
    res.status(200).json(budgets)
  } catch (err) {
    console.error('Error fetching expenses:', err)
    res.status(500).send('Something went wrong')
  }
})

// GET /api/v1/budgets/:id -- budgets by ID
router.get('/:id', async (req, res) => {
  try {
    const budgetId = Number(req.params.id)
    const budget = await BudgetDb.getBudgetById(budgetId)

    if (!budget) return res.status(404).send('Expense not found')

    res.status(200).json(budget)
  } catch (err) {
    console.error('Error fetching expense:', err)
    res.status(500).send('Something went wrong')
  }
})

router.post('/', async (req, res) => {
  try {
    const { user_id, total_amount, name } = req.body
    if (!user_id || !total_amount || !name) {
      return res.status(400).send('Missing Required Fields! ')
    }
    const newBudget = await BudgetDb.addBudget({ user_id, total_amount, name })
    res.status(201).json(newBudget)
  } catch (err) {
    console.error(err)
    res.status(500).send('Something has gone wrong adding a budget!')
  }
})

// PATCH /api/v1/budgets/:id -- partial update
router.patch('/:id', async (req, res) => {
  try {
    const budgetId = Number(req.params.id)
    const updates: Partial<BudgetData> = req.body

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No fields provided for update' })
    }

    const updatedBudget = await BudgetDb.updateBudget(budgetId, updates)
    if (!updatedBudget) {
      return res
        .status(404)
        .json({ message: 'Expense not found - update failed' })
    }

    res.status(200).json(updatedBudget)
  } catch (err) {
    console.error('Error updating Budget:', err)
    res.status(500).send('Could not update Budget')
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const budgetId = Number(req.params.id)
    const deletedCount = await BudgetDb.deleteBudget(budgetId)

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Budget not found' })
    }

    res.status(200).json({ message: `Budget ${budgetId} deleted` })
  } catch (error) {
    console.error('Could not delete budget:', error)
    res.sendStatus(500)
  }
})

export default router
