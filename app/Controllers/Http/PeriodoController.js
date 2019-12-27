'use strict'

const periodos = use('App/Models/Periodo')

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
    return await periodos
      .query()
      .where('user_id', auth.user.id)
      .with('materias.aulas')
      .with('materias.faltas')
      .with('materias.notas')
      .with('horarios')
      .fetch();
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

    return await periodos.create({ ...data, user_id: auth.user.id })
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
      periodos
        .query()
        .table('periodos')
        .where({ id: params.id, user_id: auth.user.id })
        .with('materias.aulas')
        .with('materias.faltas')
        .with('materias.notas')
        .with('horarios')
        .fetch()
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

    const c = await
      periodos
        .query()
        .where({ id: params.id })
        .update({ ...data })

    return { updated: c }
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
    const removed = await
      periodos
        .query()
        .where({ id: params.id, user_id: auth.user.id })
        .delete();
    return { removed: removed }
  }
}

module.exports = PeriodoController
