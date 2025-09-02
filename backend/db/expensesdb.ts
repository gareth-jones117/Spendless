import db from './connection'

export interface ExpensesData {
  id: number
  budget_id: number
  name: string
  category: string
  amount: string
  expense_date: Date
  created_at: Date
  updated_at: Date
}

// get all expense data

export async function getAllExpenses(): Promise<ExpensesData[]> {
  return db<ExpensesData>('expenses').select(
    'id',
    'budget_id',
    'name',
    'amount',
    'expense_date',
    'created_at',
    'updated_at'
  )
}

// get expense by id
export async function getExpenseById(
  id: number
): Promise<ExpensesData | undefined> {
  return db('expenses')
    .where('id', id)
    .select(
      'id',
      'budget_id',
      'name',
      'amount',
      'expense_date',
      'created_at',
      'updated_at'
    )
    .first()
}

// add an Expense

export async function addExpense(
  expense: Omit<ExpensesData, 'id' | 'created_at' | 'updated_at'>
): Promise<ExpensesData> {
  const [newExpense] = await db('expenses')
    .insert(expense)
    .returning([
      'id',
      'budget_id',
      'name',
      'category',
      'amount',
      'expense_date',
      'created_at',
      'updated_at',
    ])

  return newExpense
}

// update expense by id

export async function updateExpense(
  id: number,
  updatedExpense: Partial<Omit<ExpensesData, 'id'>>
): Promise<ExpensesData | undefined> {
  const updatedCount = await db('expenses')
    .where({ id })
    .update({ ...updatedExpense, updated_at: db.fn.now() })

  if (updatedCount > 0) {
    return getExpenseById(id)
  }

  return undefined
}

// delete expense

export async function deleteExpense(id: number): Promise<void> {
  const expenseExists = await db('expenses').where('id', id).first()

  if (!expenseExists) {
    throw new Error('expense not found')
  }

  await db('expenses').where('id', id).delete()
}
