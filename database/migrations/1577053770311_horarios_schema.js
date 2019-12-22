'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HorariosSchema extends Schema {
  up () {
    this.create('horarios', (table) => {
      table.increments()
      table
        .integer('periodoId')        
        .unsigned()
        .references('id')
        .inTable('periodos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.date('inicio').notNullable()
      table.date('termino').notNullable()
      table.integer('ordemaula').notNullable().default(0)

      table.timestamps()
    })
  }

  down () {
    this.drop('horarios')
  }
}

module.exports = HorariosSchema
