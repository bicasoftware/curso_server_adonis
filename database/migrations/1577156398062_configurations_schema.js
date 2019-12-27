'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConfigurationsSchema extends Schema {
  up() {
    this.create('configurations', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.boolean('isLight').notNullable().default(true)
      table.boolean('notify').notNullable().default(false)

      table.timestamps()
    })
  }

  down() {
    this.drop('configurations')
  }
}

module.exports = ConfigurationsSchema
