/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('auth0_sub').unique().notNullable()
    table.string('email').unique().notNullable()
    table.string('name').notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  return knex.schema.dropTableIfExists('users')
}
