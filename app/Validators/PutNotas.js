'use strict'

const BaseValidator = require('./BaseValidator')

class PutNotas extends BaseValidator {
  get rules () {
    return {
      nota: 'required|number|range:-1,10.1'
    }
  }

  get messages() {
    return {
      'nota.required': this.requiredField('nota'),
      'nota.number': this.numberField('nota'),
      'nota.range': this.rangeField('nota', [0, 10]),
    }
  }
}

module.exports = PutNotas
