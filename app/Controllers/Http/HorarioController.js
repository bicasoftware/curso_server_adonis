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
      .where({ periodo_id: params.id })
      .fetch()
  }

  async createMany({ request }) {

    const listHorarios = JSON.parse(request.raw());
    const periodo_id = listHorarios[0].periodo_id;

    await horarios
      .query()
      .where({ periodo_id: periodo_id })
      .delete()

    await Promise.all(
      listHorarios.map(h => horarios.create({ ...h }))
    )

    return await horarios
      .query()
      .where({ periodo_id: periodo_id })
      .fetch()   

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
        .where({ periodo_id: params.id })
        .delete()

    return { removed: count }
  }
}

module.exports = HorarioController
