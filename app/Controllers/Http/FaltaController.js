'use strict'

const faltas = use('App/Models/Falta')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with faltas
 */
class FaltaController {
  /**
   * Show a list of all faltas.
   * GET faltas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    return await faltas.all()
  }

  /**
   * Create/save a new falta.
   * POST faltas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const data = request.only(['data', 'ordemAula']);
    return await faltas.create({...data})
  }

  /**
   * Display a single falta.
   * GET faltas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    return await faltas.findOrFail(params.id)
  }

  /**
   * Update falta details.
   * PUT or PATCH faltas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    //TODO - ver como fazer o update
  }

  /**
   * Delete a falta with id.
   * DELETE faltas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth }) {
    const falta = await faltas.findOrFail(params.id)
    await falta.delete();
  }
}

module.exports = FaltaController
