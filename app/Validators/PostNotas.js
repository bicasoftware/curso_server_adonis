'use strict'

const BaseValidator = require('./BaseValidator')

class PostNotas extends BaseValidator {
  get rules() {
    return {
      materia_id: "integer|required",
      data: 'date|required',
      nota: 'number|required|range:-1.0,10.1'
    }
  }

  get messages() {
    return {
      'materia_id.required': this.requiredField('materia_id'),
      'materia_id.integer': this.notIntegerField('materia_id'),
      'data.required': this.requiredField('data'),
      'nota.required': this.requiredField('nota'),
      'data.date': this.dateField('data'),
      'nota.number': this.numberField('nota')
    }
  }
}

module.exports = PostNotas
