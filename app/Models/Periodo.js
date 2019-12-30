'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const horarios = use('App/Models/Horario')
const materias = use('App/Models/Materia')
const aulas = use('App/Models/Aula')

class Periodo extends Model {
  static boot() {
    super.boot()

    /**
     * Hook que cria horários, uma matéria de exemplo
     * e adiciona materia ao calendário
     */

    this.addHook('afterCreate', async (periodo) => {

      for (let i = 0; i < 2; i++) {
        await horarios.create({
          periodo_id: periodo.id,
          ordemaula: i,
          inicio: "19:00",
          termino: "19:30"
        })
      }

      const materia = await materias.create({
        periodo_id: periodo.id,
        cor: "0xFFb2b2b2",
        nome: "Cálculo 1",
        sigla: "Calc1"
      })

      for (let i = 0; i < 2; i++) {
        await aulas.create({
          materia_id: materia.id,
          weekday: 1,
          ordem: i
        })
      }
    })
  }

  userId() {
    return this.belongsTo('App/Models/User', userId);
  }

  materias() {
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
