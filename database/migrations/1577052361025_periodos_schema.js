'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PeriodosSchema extends Schema {
  up () {
    this.create('periodos', (table) => {
      table.increments()
      table
        .integer('userId')        
        .unsigned()
        .references('id')
        .inTable('user')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      
      table.integer('numperiodo').notNullable().default(0)
      table.integer('aulasdia').notNullable().default(4)
      table.date('inicio').notNullable()
      table.date('termino').notNullable()
      table.integer('presObrig').notNullable().default(70)
      table.decimal('medaprov', 4, 2).notNullable().default(70)
      
      table.timestamps()
    })
  }

  down () {
    this.drop('periodos')
  }
}

module.exports = PeriodosSchema
