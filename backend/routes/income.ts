import { Router } from 'express'
import * as IncomeDb from '../db/incomedbs'
import { IncomeData } from '../db/incomedbs'

const router = Router()

// GET /api/v1/incomes -- all income records
router.get('/', async (req, res) => {
  try {
    const incomes: IncomeData[] = await IncomeDb.getAllIncomeData()
    res.status(200).json(incomes)
  } catch (err) {
    console.error('Error fetching incomes:', err)
    res.status(500).send('Could not get incomes')
  }
})

// GET /api/v1/incomes/:id -- income by ID
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const income = await IncomeDb.getIncomeById(id)

    if (!income) return res.status(404).send('Income not found')

    res.status(200).json(income)
  } catch (err) {
    console.error('Error fetching income:', err)
    res.status(500).send('Something went wrong')
  }
})

// POST /api/v1/incomes -- add income
router.post('/', async (req, res) => {
  try {
    const { user_id, gross_income, tax_rate, net_income } = req.body
    if (!user_id || !gross_income || !tax_rate || !net_income) {
      return res.status(400).send('Missing required fields')
    }

    const newIncome = await IncomeDb.addIncome({
      user_id,
      gross_income,
      tax_rate,
      net_income,
    })
    res.status(201).json(newIncome)
  } catch (err) {
    console.error('Error adding income:', err)
    res.status(500).send('Could not add income')
  }
})

// PATCH /api/v1/incomes/:id -- partial update
router.patch('/:id', async (req, res) => {
  try {
    const incomeId = Number(req.params.id)
    const updates: Partial<IncomeData> = req.body

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No fields provided for update' })
    }

    const updatedIncome = await IncomeDb.updateIncome(incomeId, updates)
    if (!updatedIncome) {
      return res
        .status(404)
        .json({ message: 'Income not found - update failed' })
    }

    res.status(200).json(updatedIncome)
  } catch (err) {
    console.error('Error updating income:', err)
    res.status(500).send('Could not update income')
  }
})

// DELETE /api/v1/incomes/:id -- delete income
router.delete('/:id', async (req, res) => {
  try {
    const incomeId = Number(req.params.id)
    await IncomeDb.deleteIncome(incomeId)
    res.status(200).json({ message: `Income deleted: ${incomeId}` })
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === 'Income not found') return res.sendStatus(404)
      console.error('Error deleting income:', err)
      return res.sendStatus(500)
    }
    console.error('Unexpected error deleting income:', err)
    res.sendStatus(500)
  }
})

export default router
