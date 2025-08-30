import db from './connection'

export interface IncomeData {
  id: number
  user_id: number
  gross_income: string
  tax_rate: string
  net_income: number
  created_at: Date
  updated_at: Date
}

// get all income data
export async function getAllIncomeData(): Promise<IncomeData[]> {
  return db<IncomeData>('income').select(
    'id',
    'user_id',
    'gross_income',
    'tax_rate',
    'net_income',
    'created_at',
    'updated_at'
  )
}

// get income by id
export async function getIncomeById(
  id: number
): Promise<IncomeData | undefined> {
  return db('income')
    .where('id', id)
    .select(
      'id',
      'user_id',
      'gross_income',
      'tax_rate',
      'net_income',
      'created_at',
      'updated_at'
    )
    .first()
}

// add income
export async function addIncome(
  income: Omit<IncomeData, 'id' | 'created_at' | 'updated_at'>
): Promise<IncomeData> {
  const [newIncome] = await db('income')
    .insert(income)
    .returning([
      'id',
      'user_id',
      'gross_income',
      'tax_rate',
      'net_income',
      'created_at',
      'updated_at',
    ])

  return newIncome
}

// update income by id

export async function updateIncome(
  id: number,
  updatedIncome: Partial<Omit<IncomeData, 'id'>>
): Promise<IncomeData | undefined> {
  const updatedCount = await db('income').where({ id }).update(updatedIncome)

  if (updatedCount > 0) {
    return getIncomeById(id)
  }

  return undefined
}

// delete income

export async function deleteIncome(id: number): Promise<void> {
  const incomeExists = await db('income').where('id', id).first()

  if (!incomeExists) {
    throw new Error('income not found')
  }

  await db('income').where('id', id).delete()
}
