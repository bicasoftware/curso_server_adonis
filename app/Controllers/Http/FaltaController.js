'use strict'

const faltas = use('App/Models/Falta')
// const db = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with faltas
 */
class FaltaController {
  /**
   * Create/save a new falta.
   * POST faltas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const data = request.only(['data', 'ordemAula', 'materia_id']);
    return await faltas.create({ ...data })
  }

  /**
   * Lista faltas por materia
   * GET faltas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {

    return await
      faltas
        .query()
        .where({ materia_id: params.id })
        .fetch()
  }

  /**
   * Delete a falta with id.
   * DELETE faltas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const c = await
      faltas
        .query()
        .where({ id: params.id })
        .delete()

    return { removed: c }
  }
}

module.exports = FaltaController
