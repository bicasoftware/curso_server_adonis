'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConfigurationSchema extends Schema {
  up() {
    this.create('configurations', (table) => {
      table.increments()
      table
        .integer('periodoId')
        .unsigned()
        .references('id')
        .inTable('periodos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        
      table.boolean('isLight').notNullable().default(true)
      table.boolean('notify').notNullable().default(true)
      
      table.timestamps()
    })
  }

  down() {
    this.drop('configurations')
  }
}

module.exports = ConfigurationSchema
