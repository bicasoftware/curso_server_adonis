'use strict'

class PostHorarios {
  get rules () {
    return {
      'horarios': 'required|array'
    }
  }
}

module.exports = PostHorarios
