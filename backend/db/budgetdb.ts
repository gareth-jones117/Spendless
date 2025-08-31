import db from './connection'

export interface BudgetData {
  id: number
  user_id: number
  name: string
  total_amount: number
  created_at: Date
  updated_at: Date
}

// get all budget data
export async function getAllBudgetData(): Promise<BudgetData[]> {
  return db<BudgetData>('budgets').select(
    'id',
    'user_id',
    'name',
    'total_amount',
    'created_at',
    'updated_at'
  )
}

// get budget by id
export async function getBudgetById(
  id: number
): Promise<BudgetData | undefined> {
  return db('budgets')
    .where('id', id)
    .select('id', 'user_id', 'name', 'total_amount', 'created_at', 'updated_at')
    .first()
}

// add budget
export async function addBudget(
  budget: Omit<BudgetData, 'id' | 'created_at' | 'updated_at'>
): Promise<BudgetData> {
  const [newBudget] = await db('budgets')
    .insert(budget)
    .returning(['user_id', 'name', 'total_amount'])

  return newBudget
}

// update budget by id
export async function updateBudget(
  id: number,
  updatedBudget: Partial<Omit<BudgetData, 'id'>>
): Promise<BudgetData | undefined> {
  const updatedCount = await db('budgets')
    .where({ id })
    .update({ ...updatedBudget, updated_at: db.fn.now() })

  if (updatedCount > 0) {
    return getBudgetById(id)
  }

  return undefined
}

// delete income

export async function deleteBudget(id: number): Promise<void> {
  const budgetExists = await db('budgets').where('id', id).first()

  if (!budgetExists) {
    throw new Error('budget not found')
  }

  await db('budgets').where('id', id).delete()
}
