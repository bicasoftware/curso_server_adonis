'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MateriasSchema extends Schema {
  up () {
    this.create('materias', (table) => {
      table.increments()
      table
        .integer('periodo_id')        
        .unsigned()
        .references('id')
        .inTable('periodos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('cor', 10).notNullable().default('0x00000000')
      table.string('nome', 64).notNullable().default('Matemática')
      table.string('sigla', 5).notNullable().default('MAT')
      table.integer('freq').notNullable().default(70)
      table.decimal('medaprov', 4, 2).notNullable().default(0.00)
      table.timestamps()
    })
  }

  down () {
    this.drop('materias')
  }
}

module.exports = MateriasSchema
