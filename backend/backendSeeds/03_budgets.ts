/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import type { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // clear users
  await knex('budgets').del()

  await knex('budgets').insert([
    {
      id: 1,
      user_id: 1,
      name: 'Groceries',
      total_amount: 500.0,
    },
    {
      id: 2,
      user_id: 1,
      name: 'Rent',
      total_amount: 1200.0,
    },
    {
      id: 3,
      user_id: 2,
      name: 'Entertainment',
      total_amount: 300.0,
    },
    {
      id: 4,
      user_id: 3,
      name: 'Utilities',
      total_amount: 250.0,
    },
  ])
}
