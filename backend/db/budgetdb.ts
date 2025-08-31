import db from './connection'

export interface BudgetData {
  id: number
  user_id: number
  name: string
  total_amount: number
  created_at: string
  updated_at: string
}

// get all budget data
export async function getAllBudgetData(): Promise<BudgetData[]> {
  return db<BudgetData>('budget').select(
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
  return db('budget')
    .where('id', id)
    .select('id', 'user_id', 'name', 'total_amount', 'created_at', 'updated_at')
    .first()
}

// add budget
export async function addbudget(
  budget: Omit<BudgetData, 'id' | 'created_at' | 'updated_at'>
): Promise<BudgetData> {
  const [newBudget] = await db('budget')
    .insert(budget)
    .returning([
      'id',
      'user_id',
      'gross_income',
      'tax_rate',
      'net_income',
      'created_at',
      'updated_at',
    ])

  return newBudget
}

// update budget by id
export async function updateBudget(
  id: number,
  updatedBudget: Partial<Omit<BudgetData, 'id'>>
): Promise<BudgetData | undefined> {
  const updatedCount = await db('budget').where({ id }).update(updatedBudget)

  if (updatedCount > 0) {
    return getBudgetById(id)
  }

  return undefined
}

// delete income

export async function deleteBudget(id: number): Promise<void> {
  const budgetExists = await db('budget').where('id', id).first()

  if (!budgetExists) {
    throw new Error('income not found')
  }

  await db('budget').where('id', id).delete()
}
