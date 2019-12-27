'use strict'

const aulas = use('App/Models/Aula')

class AulaController {
  async create({ request }) {
    const data = request.only(['materia_id', 'weekday', 'ordem'])
    return await aulas.create({ ...data })
  }

  async findByMateria({ params }) {
    return await aulas
      .query()
      .where({ materia_id: params.id })
      .fetch()
  }
  
  async deleteById({ params }) {
    const removed = await
      aulas
        .query()
        .where({ id: params.id })
        .delete()

    return { removed: removed }
  }
}

module.exports = AulaController
