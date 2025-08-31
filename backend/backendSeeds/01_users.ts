/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import type { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // clear users
  await knex('users').del()

  // insert users
  await knex('users').insert([
    {
      id: 1,
      auth0_sub: 'auth0|neo123456',
      name: 'Raven',
      email: 'Titan@example.com',
    },
    {
      id: 2,
      auth0_sub: 'auth0|stellar987654',
      name: 'Robin',
      email: 'Robin@example.com',
    },
    {
      id: 3,
      auth0_sub: 'auth0|cyborg112233',
      name: 'Cyborg',
      email: 'league@example.com',
    },
  ])
}
