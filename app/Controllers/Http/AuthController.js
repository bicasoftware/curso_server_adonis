'use strict'

const User = use('App/Models/User')
const periodos = use('App/Models/Periodo')
const configs = use('App/Models/Configuration')

class AuthController {

  async register({ request, auth, response }) {
    const { email, password, username } = request.all()

    const user = await User.query().where({ email: email }).first()
    if (user) {
      response.status(401).send({
        field: 'email',
        message: 'email already exists'
      })
    } else {
      const newUser = await User.create({ email: email, password: password, username: username })
      const attempt = await
        auth
          .withRefreshToken()
          .attempt(email, password)

      const userData = await this.findUserData(newUser)
      return {
        ...userData,
        email: email,
        token: attempt.token,
        refresh_token: attempt.refreshToken
      }
    }
  }

  async authenticate({ request, auth }) {
    const { email, password } = request.all()

    const attempt = await auth
      .withRefreshToken()
      .attempt(email, password)

    const user = await User.query().where({ email: email }).first()

    const userData = await this.findUserData(user)

    return {
      ...userData,
      email: email,
      token: attempt.token,
      refresh_token: attempt.refreshToken
    }
  }

  async unregister({ auth, response }) {
    const id = auth.user.id;

    const user = await User.query().where({ id: id }).first()

    if (!user) {
      response.status(403).send({
        field: 'authentication',
        message: 'impossible to authenticate a user via token'
      }
      )
    } else {
      const count = await user.delete()
      return {
        removed: count
      }
    }
  }

  async refreshToken({ request, auth }) {
    const rt = request.only(['refresh_token'])
    const newToken = await auth.generateForRefreshToken(rt.refresh_token, true)
    return {
      token: newToken.token,
      refreshToken: newToken.refreshToken
    }
  }

  async findUserData(user) {
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
      periodos: data,
      configurations: conf
    }
  }

}

module.exports = AuthController
