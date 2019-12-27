'use strict'

const BaseValidator = require('./BaseValidator')

class PostMaterias extends BaseValidator {
  get rules() {
    return {
      periodo_id: 'required|integer',
      cor: 'required|string',
      nome: 'required|string',
      sigla: 'required|string',
      freq: 'required|integer',
      medaprov: 'required|number',
    }
  }

  get messages() {
    return {
      'periodo_id.required': this.requiredField('periodo_id'),
      'periodo_id.integer': this.notIntegerField('periodo_id'),
      'cor.required': this.requiredField('cor'),
      'cor.string': this.stringField('cor'),
      'nome.required': this.requiredField('nome'),
      'nome.string': this.stringField('nome'),
      'sigla.required': this.requiredField('sigla'),
      'sigla.string': this.stringField('sigla'),
      'freq.required': this.requiredField('freq'),
      'freq.integer': this.notIntegerField('freq'),
      'medaprov.required': this.requiredField('medaprov'),
      'medaprov.number': this.numberField('medaprov')
    }
  }
}

module.exports = PostMaterias
