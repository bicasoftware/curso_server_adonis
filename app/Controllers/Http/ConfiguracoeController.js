'use strict'

const conf = use('App/Models/Configuration')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with configuracoes
 */
class ConfiguracoeController {  
  async find({ auth }) {
    return await conf
      .query()
      .where({ user_id: auth.user.id })
      .fetch()
  }

  /**
   * Create/save a new configuracoe.
   * POST configuracoes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, auth }) {
    const data = request.only(['isLight', 'notify'])
    const c = await
      conf
        .query()
        .where({ user_id: auth.user.id })
        .update({ ...data })

    return { modified: c }
  }  
}

module.exports = ConfiguracoeController
