'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Aula extends Model {
  materia() {
    return this.belongsTo('App/Models/Materia')
  }

  static get hidden() {
    return ['materia_id', 'created_at', 'updated_at']
  }
}

module.exports = Aula
