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
  /**
   * Show a list of all horarios.
   * GET horarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    return await horarios.all()
  }

  /**
   * Create/save a new horario.
   * POST horarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(['periodoId', 'inicio', 'termino', 'ordemaula'])
    return await horarios.create({ ...data })
  }

  /**
   * Display a single horario.
   * GET horarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    return await horarios.findOrFail(params.id)
  }

  /**
   * Update horario details.
   * PUT or PATCH horarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only(['periodoId', 'inicio', 'termino', 'ordemaula'])
    const c = await db
      .table('horarios')
      .where({ id: params.id })
      .update({ ...data })

    return { updated: c }
  }

  /**
   * Delete a horario with id.
   * DELETE horarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const count = await db.table('horarios').where({ id: params.id }).delete()
    return { deleted: count }
  }
}

module.exports = HorarioController
