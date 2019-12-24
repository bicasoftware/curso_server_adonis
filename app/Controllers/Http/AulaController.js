'use strict'

const aulas = use('App/Models/Aula')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with aulas
 */
class AulaController {
  /**
   * Create/save a new aula.
   * POST aulas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const data = request.only(['materiaId', 'weekday', 'ordem'])
    return await aulas.create({ ...data })
  }

  /**
   * Lista aulas por materia.
   * GET aulas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    return await aulas
      .query()
      .wher({ materiaId: params.id })
  }

  /**
   * Delete a aula with id.
   * DELETE aulas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const removed = await
      aulas
        .query()
        .where({ id: params.id })
        .delete()

    return { removed: removed }
  }
}

module.exports = AulaController
