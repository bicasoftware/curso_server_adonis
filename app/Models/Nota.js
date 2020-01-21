'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Nota extends Model {
  materia() {
    return this.belongsTo('App/Models/Materia')
  }

  static get hidden() {
    return ['created_at', 'updated_at']
  }
}

module.exports = Nota
