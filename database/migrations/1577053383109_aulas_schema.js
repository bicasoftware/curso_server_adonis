'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AulasSchema extends Schema {
  up () {
    this.create('aulas', (table) => {
      table.increments()
      table
        .integer('materiaId')        
        .unsigned()
        .references('id')
        .inTable('materias')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      
      table.integer('weekday').notNullable().default(0)
      table.integer('ordem').notNullable().default(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('aulas')
  }
}

module.exports = AulasSchema
