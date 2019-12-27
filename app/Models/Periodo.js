'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Periodo extends Model {
  userId() {
    return this.belongsTo('App/Models/User', userId);
  }

  materias () {
    return this.hasMany('App/Models/Materia')
  }

  horarios() {
    return this.hasMany('App/Models/Horario')
  }

  static get hidden() {
    return ['user_id', 'created_at', 'updated_at']
  }
}

module.exports = Periodo
