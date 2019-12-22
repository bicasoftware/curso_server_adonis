'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Horario extends Model {
  periodo() {
    return this.belongsTo('App/Models/Periodo')
  }
}

module.exports = Horario
