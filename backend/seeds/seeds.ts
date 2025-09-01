import type { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('expenses').del()
  await knex('budgets').del()
  await knex('income').del()
  await knex('users').del()

  await knex('users').insert([
    {
      id: 1,
      auth0_sub: 'auth0|alice123',
      email: 'alice@example.com',
      name: 'Alice',
    },
    { id: 2, auth0_sub: 'auth0|bob456', email: 'bob@example.com', name: 'Bob' },
    {
      id: 3,
      auth0_sub: 'auth0|carol789',
      email: 'carol@example.com',
      name: 'Carol',
    },
  ])

  await knex('income').insert([
    {
      id: 1,
      user_id: 1,
      gross_income: 50000.0,
      tax_rate: 20.0,
      net_income: 40000.0,
    },
    {
      id: 2,
      user_id: 1,
      gross_income: 52000.0,
      tax_rate: 22.0,
      net_income: 40560.0,
    },
    {
      id: 3,
      user_id: 2,
      gross_income: 60000.0,
      tax_rate: 18.0,
      net_income: 49200.0,
    },
    {
      id: 4,
      user_id: 3,
      gross_income: 45000.0,
      tax_rate: 15.0,
      net_income: 38250.0,
    },
  ])

  await knex('budgets').insert([
    { id: 1, user_id: 1, name: 'Food', total_amount: 600.0 },
    { id: 2, user_id: 1, name: 'Entertainment', total_amount: 400.0 },
    { id: 3, user_id: 2, name: 'Rent', total_amount: 1200.0 },
    { id: 4, user_id: 2, name: 'Utilities', total_amount: 300.0 },
    { id: 5, user_id: 3, name: 'Travel', total_amount: 1500.0 },
  ])

  await knex('expenses').insert([
    {
      id: 1,
      budget_id: 1,
      name: 'Groceries',
      category: 'Food',
      amount: 200.0,
      expense_date: '2025-08-01',
    },
    {
      id: 2,
      budget_id: 1,
      name: 'Lunch',
      category: 'Food',
      amount: 50.0,
      expense_date: '2025-08-03',
    },
    {
      id: 3,
      budget_id: 2,
      name: 'Movie night',
      category: 'Entertainment',
      amount: 75.0,
      expense_date: '2025-08-05',
    },
    {
      id: 4,
      budget_id: 3,
      name: 'August Rent',
      category: 'Housing',
      amount: 1200.0,
      expense_date: '2025-08-01',
    },
    {
      id: 5,
      budget_id: 4,
      name: 'Electricity bill',
      category: 'Utilities',
      amount: 100.0,
      expense_date: '2025-08-02',
    },
    {
      id: 6,
      budget_id: 5,
      name: 'Flight to Wellington',
      category: 'Travel',
      amount: 800.0,
      expense_date: '2025-08-10',
    },
    {
      id: 7,
      budget_id: 5,
      name: 'Hotel stay',
      category: 'Travel',
      amount: 500.0,
      expense_date: '2025-08-12',
    },
  ])
}
