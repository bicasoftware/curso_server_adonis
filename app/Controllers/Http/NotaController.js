'use strict'

const notas = use('App/Models/Nota')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with notas
 */
class NotaController {
  /**
   * Create/save a new nota.
   * POST notas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const data = request.only(['materia_id', 'data', 'nota'])
    return notas.create({ ...data })
  }

  /**
   * Lista notas por materia.
   * GET notas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    return notas.query()
      .where({ materia_id: params.id })
      .fetch()
  }

  /**
   * Update nota details.
   * PUT or PATCH notas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const data = request.only(['nota'])
    const count = await
      notas
        .query()
        .where({ id: params.id })
        .update({ ...data })

    return { updated: count }
  }

  /**
   * Delete a nota with id.
   * DELETE notas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const count = await
      notas
        .query()
        .where({ id: params.id })
        .delete()

    return { removed: count }
  }
}

module.exports = NotaController
