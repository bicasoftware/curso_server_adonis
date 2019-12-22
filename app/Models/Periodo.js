'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Periodo extends Model {
  usuarioId() {
    return this.belongsTo('App/Models/User');
  }

  horarios() {
    return this.hasMany('App/Models/Horario')
  }

  configuration() {
    return this.hasOne('App/Models/Configuration')
  }
}

module.exports = Periodo
