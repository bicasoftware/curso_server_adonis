'use strict'
const BaseValidator = require('./BaseValidator')

class PostFaltas extends BaseValidator {

  get rules() {
    return {
      materia_id: "integer|required",
      data: 'date|required',
      ordemAula: 'integer|required|range:-1,13'
    }
  }

  get messages() {
    return {
      'materia_id.integer': this.notIntegerField('materia_id'),
      'materia_id.required': this.requiredField('materia_id'),
      'data.date': this.dateField('date'),
      'data.required': this.requiredField('data'),
      'ordemAula.integer': this.notIntegerField('ordemAula'),
      'ordemAula.required': this.requiredField('ordemAula'),
      'ordemAula.range': this.rangeField('ordemAula', [0, 12])
    }
  }
}

module.exports = PostFaltas
