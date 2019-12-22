'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Nota extends Model {
  materia() {
    return this.belongsTo('App/Models/Materia')
  }
}

module.exports = Nota
