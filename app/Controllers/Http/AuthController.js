'use strict'

const User = use('App/Models/User')
const periodos = use('App/Models/Periodo')
const configs = use('App/Models/Configuration')

class AuthController {

  async register({ request, auth }) {
    const { email, password, username } = request.all()

    const user = await User.query().where({ email: email }).first()
    if (user) {
      return {
        field: 'email',
        message: 'email already exists'
      }
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

  async unregister({ request, auth }) {
    const { email, password } = request.all()

    const finduser = await User.query().where({ email: email }).first()
    if (!finduser) {
      return {
        field: 'email',
        message: 'email not registered'
      }
    } else {
      const tryAuth = await auth.attempt(email, password)
      if (!tryAuth) {
        return {
          field: 'password',
          message: 'invalid password. Account can\'t be removed'
        }
      } else {
        const count = await User.query().where({ email: email }).delete()
        return {
          removed: count
        }
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
      data: { periodos: data },
      configurations: conf
    }
  }

}

module.exports = AuthController
