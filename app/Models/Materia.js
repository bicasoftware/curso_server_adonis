'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Materia extends Model {
  periodo() {
    return this.belongsTo('App/Models/Periodo')
  }

  faltas() {
    return this.hasMany('App/Models/Falta')
  }

  aulas () {
    return this.hasMany('App/Models/Aula')
  }

  notas () {
    return this.hasMany('App/Models/Nota')
  }

  static get hidden() {
    return ['created_at', 'updated_at']
  }
}

module.exports = Materia
