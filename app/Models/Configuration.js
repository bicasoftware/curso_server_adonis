'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Configuration extends Model {
  periodo() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Configuration