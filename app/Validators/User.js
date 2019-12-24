'use strict'

class User {
  get rules () {
    return {
      'email': 'required|email',
      'password': 'required'
    }
  }
}

module.exports = User
