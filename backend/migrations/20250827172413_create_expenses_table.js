/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('expenses', (table) => {
    table.increments('id').primary()
    table
      .integer('budget_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('budgets')
      .onDelete('CASCADE')
    table.string('name').notNullable()
    table.string('category').notNullable()
    table.decimal('amount', 10, 2).notNullable()
    table.date('expense_date').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('expenses')
}
