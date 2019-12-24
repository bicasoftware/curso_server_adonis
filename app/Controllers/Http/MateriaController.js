'use strict'

const materias = use('App/Models/Materia')
const db = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with materias
 */
class MateriaController {
  /**
   * Show a list of all materias.
   * GET materias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    return materias.all()
  }

  /**
   * Create/save a new materia.
   * POST materias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only([
      'periodoId', 'cor', 'nome', 'sigla', 'freq', 'medaprov'
    ])

    return await materias.create({ ...data })
  }

  /**
   * Display a single materia.
   * GET materias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    return await materias.findOrFail(params.id)
  }

  /**
   * Update materia details.
   * PUT or PATCH materias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only([
      'periodoId', 'cor', 'nome', 'sigla', 'freq', 'medaprov'
    ])

    const c = await
      db
        .table('materias')
        .where({ id: params.id })
        .update({ ...data })

    return { updated: c }
  }

  /**
   * Delete a materia with id.
   * DELETE materias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const c = await
      db
        .table('materias')
        .where({ id: params.id })
        .delete()

    return { deleted: c }
  }
}

module.exports = MateriaController
