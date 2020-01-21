'use strict'

const BaseValidator = require('./BaseValidator')

class PostAula extends BaseValidator {
  get rules() {
    return {
      materia_id: 'required|integer',
      weekday: 'required|integer|range:-1,7',
      ordem: 'required|integer|range:-1,13'
    }
  }

  get messages() {
    return {
      'materia_id.required': this.requiredField('materia_id'),
      'weekday.required': this.requiredField('weekday'),
      'ordem.required': this.requiredField('ordem'),
      'materia_id.integer': this.notIntegerField('materia_id'),
      'weekday.integer': this.notIntegerField('weekday'),
      'ordem.integer': this.notIntegerField('ordem'),
      'weekday.range': this.rangeField('weekday',[0, 6]),
      'ordem.range': this.rangeField('ordem', [0, 12])
    }
  }
}

module.exports = PostAula
