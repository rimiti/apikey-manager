import Exception from '../base'

export default class ExceptionResourceNotFound extends Exception {

  constructor(message) {
    super()
    this.name = 'ExceptionResourceNotFound'
    this.message = message ? message : `Resource not found`
  }
}
