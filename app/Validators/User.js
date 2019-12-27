'use strict'

const BaseValidator = require('./BaseValidator')

class User extends BaseValidator {
  get rules () {
    return {
      'email': 'required|email',
      'password': 'required'
    }
  }

  get messages() {
    return {
      'email.required': this.requiredField('email'),
      'email.email': 'field email not a valid email',
      'password.required': this.requiredField('password')
    }
  }
}

module.exports = User
