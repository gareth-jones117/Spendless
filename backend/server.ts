import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import usersRouter from './routes/users'
import incomeRouter from './routes/income'
import budgetsRouter from './routes/budgets'
import expensesRouter from './routes/expenses'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/users', usersRouter)
app.use('/income', incomeRouter)
app.use('/budgets', budgetsRouter)
app.use('/expenses', expensesRouter)

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
})
