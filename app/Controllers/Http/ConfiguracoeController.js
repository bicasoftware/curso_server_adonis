'use strict'

const conf = use('App/Models/Configuration')
const db = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with configuracoes
 */
class ConfiguracoeController {
  /**
   * Show a list of all configuracoes.
   * GET configuracoes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth }) {
    return await db.table('configurations').where({ userId: auth.user.id }).first()
  }

  /**
   * Create/save a new configuracoe.
   * POST configuracoes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) { }

  /**
   * Display a single configuracoe.
   * GET configuracoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    return conf.findOrFail(params.id)
  }

  /**
   * Update configuracoe details.
   * PUT or PATCH configuracoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only(['isLight', 'notify'])
    const c = await
      db
        .table('configurations')
        .where({ userId: auth.user.id })
        .update({ ...data })

    return { updated: c }
  }
}

module.exports = ConfiguracoeController
