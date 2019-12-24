'use strict'

const aulas = use('App/Models/Aula')
const db = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with aulas
 */
class AulaController {
  /**
   * Show a list of all aulas.
   * GET aulas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    return await aulas.all()
  }

  /**
   * Render a form to be used for creating a new aula.
   * GET aulas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

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
   * Display a single aula.
   * GET aulas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    return await aulas.findOrFail(params.id)
  }

  /**
   * Update aula details.
   * PUT or PATCH aulas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only(['materiaId', 'weekday', 'ordem'])
    const updated = await
      db
        .table('aulas')
        .where({ id: params.id })
        .update(data)

    return { updated: updated }
  }

  /**
   * Delete a aula with id.
   * DELETE aulas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const removed = await
      db
        .table('aulas')
        .where({ id: params.id })
        .delete()

    return { removed: removed }
  }
}

module.exports = AulaController
