'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotasSchema extends Schema {
  up () {
    this.create('notas', (table) => {
      table.increments()
      table
        .integer('materiaId')        
        .unsigned()
        .references('id')
        .inTable('materias')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      
      table.date('data').notNullable()
      table.decimal('nota', 4, 2).notNullable().default(0.00)
      table.timestamps()
    })
  }

  down () {
    this.drop('notas')
  }
}

module.exports = NotasSchema
