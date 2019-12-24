'use strict'

const horarios = use('App/Models/Horario')
const db = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with horarios
 */
class HorarioController {
  async findByPeriodo({ params }) {
    return await horarios
      .query()
      .where({ periodoId: params.id })
      .fetch()
  }

  async createMany({ request }) {
    const listHorarios = request.only(['horarios'])
    listHorarios.horarios.forEach(h => {
      horarios.create({ ...h })
    })
    return { status: "ok" };
  }

  /**
   * Delete a horario with id.
   * DELETE horarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async deleteByPeriodo({ params }) {
    const count = await 
      horarios
        .query()
        .where({ periodoId: params.id })
        .delete()

    return { deleted: count }
  }
}

module.exports = HorarioController
