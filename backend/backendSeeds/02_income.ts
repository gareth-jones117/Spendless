/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import type { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('income').del()
  await knex('income').insert([
    {
      user_id: 1,
      gross_income: 3000.45,
      tax_rate: 20.0,
      net_income: 2400.36,
    },
    {
      user_id: 2,
      gross_income: 5000.0,
      tax_rate: 25.0,
      net_income: 3750.0,
    },
    {
      user_id: 3,
      gross_income: 4200.75,
      tax_rate: 22.5,
      net_income: 3255.56,
    },
  ])
}