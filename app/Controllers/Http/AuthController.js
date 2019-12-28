'use strict'

const User = use('App/Models/User')
const periodos = use('App/Models/Periodo')
const configs = use('App/Models/Configuration')

class AuthController {

  async register({ request }) {
    const data = request.only(['username', 'email', 'password'])

    return await User.create(data)
  }

  async authenticate({ request, auth }) {
    const { email, password } = request.all()
    const authData = await auth.attempt(email, password)

    const user = await User.query().where({ email: email }).first()
    const data = await
      periodos
        .query()
        .where({ user_id: user.id })
        .with('materias.aulas')
        .with('materias.faltas')
        .with('materias.notas')
        .with('horarios')
        .fetch()

    const conf = await configs.query().where({ user_id: user.id }).first()

    return {
      email: email,
      token: authData.token,
      data: { periodos: data },
      configurations: conf
    }
  }

}

module.exports = AuthController
