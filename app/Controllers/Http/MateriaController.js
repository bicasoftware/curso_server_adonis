'use strict'

const materias = use('App/Models/Materia')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with materias
 */
class MateriaController {
  /**
   * Create/save a new materia.
   * POST materias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const data = request.only([
      'periodo_id', 'cor', 'nome', 'sigla', 'freq', 'medaprov'
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
  async show({ params }) {
    return await
     materias
      .query()
      .where({periodo_id: params.id})
      .with('aulas')
      .with('faltas')
      .with('notas')
      .fetch()
  }

  /**
   * Update materia details.
   * PUT or PATCH materias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const data = request.only([
      'periodo_id', 'cor', 'nome', 'sigla', 'freq', 'medaprov'
    ])

    const c = await
      materias
        .query()
        .where({ id: params.id })
        .update({ ...data })

    return { modified: c }
  }

  /**
   * Delete a materia with id.
   * DELETE materias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const c = await
      materias
        .query()
        .where({ id: params.id })
        .delete()

    return { removed: c }
  }
}

module.exports = MateriaController
