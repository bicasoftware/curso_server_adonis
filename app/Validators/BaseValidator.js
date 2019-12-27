class BaseValidator {
  async fails(errorMessages) {
    this.ctx.response.status(403).send({
      error: errorMessages[0].message
    })
  }

  get validateAll() {
    return true
  }

  notIntegerField(fieldName) {
    return `field ${fieldName} is not an integer`
  }

  requiredField(fieldName) {
    return `field ${fieldName} is required`
  }

  dateField(fieldName) {
    return `field ${fieldName} is not a date`
  }

  rangeField(fieldName, range) {
    return `field ${fieldName} must be between ${range.join().replace(',', ' and ')}`
  }

  numberField(fieldName) {
    return `field ${fieldName} is not a number`
  }

  stringField(fieldName) {
    return `field ${fieldName} is not a string`;
  }

  booleanField(fieldName) {
    return `field ${fieldName} is not a boolean value`;
  }
}

module.exports = BaseValidator