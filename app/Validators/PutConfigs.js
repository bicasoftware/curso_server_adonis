'use strict'

const BaseValidator = require('./BaseValidator')

class PutConfigs extends BaseValidator {
  get rules() {
    return {
      isLight: 'required|boolean',
      notify: 'required|boolean'
    }
  }

  get messages() {
    return {
      'isLight.required': this.requiredField('isLight'),
      'notify.required': this.requiredField('notify'),
      'notify.boolean': this.booleanField('notify'),
      'isLight.boolean': this.booleanField('isLight')
    }
  }
}

module.exports = PutConfigs
