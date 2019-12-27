'use strict'

const BaseValidator = require('./BaseValidator')

class PostPeriodo extends BaseValidator {
  get rules() {
    return {
      numperiodo: 'required|integer',
      aulasdia: 'required|integer',
      inicio: 'required|date',
      termino: 'required|date',
      presObrig: 'required|integer',
      medaprov: 'required|number',
    }
  }

  get message() {
    return {
      'numperiodo.required': this.requiredField('numperiodo'),
      'aulasdia.required': this.requiredField('aulasdia'),
      'inicio.required': this.requiredField('inicio'),
      'termino.required': this.requiredField('termino'),
      'presObrig.required': this.requiredField('presObrig'),
      'medaprov.required': this.requiredField('medaprov'),
      'aulasdia.integer': this.notIntegerField('aulasdia'),
      'presObrig.integer': this.notIntegerField('presObrig'),
      'medaprov.number': this.numberField('medaprov'),
      'inicio.date': this.dateField('inicio'),
      'termino.date': this.dateField('termino')
    }
  }
}

module.exports = PostPeriodo
