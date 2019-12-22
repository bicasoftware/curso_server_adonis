'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FaltasSchema extends Schema {
  up () {
    this.create('faltas', (table) => {
      table.increments()
      table
        .integer('materiaId')        
        .unsigned()
        .references('id')
        .inTable('materias')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      
      table.date('data').notNullable()
      table.integer('ordemAula').notNullable().default(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('faltas')
  }
}

module.exports = FaltasSchema
