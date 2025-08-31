/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import type { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // clear old data
  await knex('expenses').del()

  // insert seed data
  await knex('expenses').insert([
    {
      id: 1,
      budget_id: 1,
      name: 'Weekly groceries',
      category: 'Food',
      amount: '120.50',
      expense_date: new Date('2025-08-01'),
    },
    {
      id: 2,
      budget_id: 2,
      name: 'August Rent',
      category: 'Housing',
      amount: '1200.00',
      expense_date: new Date('2025-08-01'),
    },
    {
      id: 3,
      budget_id: 3,
      name: 'Movie night',
      category: 'Entertainment',
      amount: '45.00',
      expense_date: new Date('2025-08-03'),
    },
    {
      id: 4,
      budget_id: 4,
      name: 'Electricity bill',
      category: 'Utilities',
      amount: '85.75',
      expense_date: new Date('2025-08-02'),
    },
  ])
}
