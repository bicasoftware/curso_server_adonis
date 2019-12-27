'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HorariosSchema extends Schema {
  up () {
    this.create('horarios', (table) => {
      table.increments()
      table
        .integer('periodo_id')        
        .unsigned()
        .references('id')
        .inTable('periodos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.string('inicio', 5).notNullable()
      table.string('termino', 5).notNullable()
      table.integer('ordemaula').notNullable().default(0)

      table.timestamps()
    })
  }

  down () {
    this.drop('horarios')
  }
}

module.exports = HorariosSchema
