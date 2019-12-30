'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const periodos = use('App/Models/Periodo')
const configuracoes = use('App/Models/Configuration')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

    /**
     * Hook que cria novo periodo e configuracoes após novo usuário ser criado
    */
    this.addHook('afterCreate', async (user) => {
      await periodos.create({
        inicio: "2020-01-14",
        termino: "2020-06-12",
        user_id: user.id
      })

      await configuracoes.create({
        user_id: user.id
      })
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  periodos() {
    return this.hasMany('App/Models/Periodo')
  }

  static get hidden() {
    return ['created_at', 'updated_at', 'refreshToken']
  }
}

module.exports = User
