'use strict'

const notas = use('App/Models/Aula')
const db = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with notas
 */
class NotaController {
  /**
   * Show a list of all notas.
   * GET notas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    return await notas.all()
  }

  /**
   * Create/save a new nota.
   * POST notas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const data = request.only(['materiaId', 'data', 'nota'])
    return notas.create({ ...data })
  }

  /**
   * Display a single nota.
   * GET notas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    return await notas.findOrFail(params.id)
  }

  /**
   * Update nota details.
   * PUT or PATCH notas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only(['materiaId', 'data', 'nota'])
    const count = await
      db
        .table('notas')
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
  async destroy({ params, request, response }) {
    const count = await db.table('notas').where({ id: params.id }).delete()
    return { removed: count }
  }
}

module.exports = NotaController
