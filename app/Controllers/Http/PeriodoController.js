'use strict'

const periodo = use('App/Models/Periodo')
const db = use('Database');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class PeriodoController {
  /**
   * Show a list of all periodos.
   * GET periodos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth }) {
    return await db.table('periodos').where('userId', auth.user.id);
  }

  /**
   * Create/save a new periodo.
   * POST periodos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.only([
      'numperiodo', 'aulasdia', 'inicio', 'termino', 'presObrig', 'medaprov'
    ])

    return await periodo.create({ ...data, userId: auth.user.id })
  }

  /**
   * Display a single periodo.
   * GET periodos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, auth }) {
    return await 
      db
        .table('periodos')
        .where({ id: params.id, userId: auth.user.id })
  }

  /**
   * Update periodo details.
   * PUT or PATCH periodos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const data = request.only([
      'numperiodo', 'aulasdia', 'inicio', 'termino', 'presObrig', 'medaprov'
    ])
    return await db.table('periodos').where({ id: params.id }).update({ ...data })
  }

  /**
   * Delete a periodo with id.
   * DELETE periodos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth }) {
    const removed = await db.table('periodos').where({ id: params.id, userId: auth.user.id }).delete();
    return { removed: removed }
  }
}

module.exports = PeriodoController
