import { Router } from 'express'
import { ExpensesData } from '../db/expensesdb'
import * as ExpensesDb from '../db/expensesdb'

const router = Router()

// GET /api/v1/expenses -- all expenses
router.get('/', async (req, res) => {
  try {
    const expenses: ExpensesData[] = await ExpensesDb.getAllExpenses()
    res.status(200).json(expenses)
  } catch (err) {
    console.error('Error fetching expenses:', err)
    res.status(500).send('Something went wrong')
  }
})

// GET /api/v1/expenses/:id -- expense by ID
router.get('/:id', async (req, res) => {
  try {
    const expenseId = Number(req.params.id)
    const expense = await ExpensesDb.getExpenseById(expenseId)

    if (!expense) return res.status(404).send('Expense not found')

    res.status(200).json(expense)
  } catch (err) {
    console.error('Error fetching expense:', err)
    res.status(500).send('Something went wrong')
  }
})

// POST /api/v1/expenses -- add new expense
router.post('/', async (req, res) => {
  try {
    const { budget_id, name, category, amount, expense_date } = req.body

    if (!budget_id || !name || !category || !amount || !expense_date) {
      return res.status(400).send('Missing required fields!')
    }

    const newExpense = await ExpensesDb.addExpense({
      budget_id,
      name,
      category,
      amount,
      expense_date,
    })

    res.status(201).json(newExpense)
  } catch (err) {
    console.error('Error adding expense:', err)
    res.status(500).send('Something went wrong adding a new expense!')
  }
})

// PATCH /api/v1/expenses/:id -- partial update
router.patch('/:id', async (req, res) => {
  try {
    const expenseId = Number(req.params.id)
    const updates: Partial<ExpensesData> = req.body

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No fields provided for update' })
    }

    const updatedExpense = await ExpensesDb.updateExpense(expenseId, updates)
    if (!updatedExpense) {
      return res
        .status(404)
        .json({ message: 'Expense not found - update failed' })
    }

    res.status(200).json(updatedExpense)
  } catch (err) {
    console.error('Error updating expense:', err)
    res.status(500).send('Could not update expense')
  }
})

// DELETE /api/v1/expenses/:id -- delete expense
router.delete('/:id', async (req, res) => {
  try {
    const expenseId = Number(req.params.id)
    await ExpensesDb.deleteExpense(expenseId)
    res.status(200).json({ message: `Expense deleted ${expenseId}` })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Expense not found') {
        res.sendStatus(404)
      } else {
        console.error('Could not delete expense:', error)
        res.sendStatus(500)
      }
    } else {
      console.error('Unexpected error, could not delete expense:', error)
      res.sendStatus(500)
    }
  }
})

export default router
