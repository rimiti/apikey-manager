import Exception from '../base'

export default class ExceptionResourceFound extends Exception {

  constructor(message) {
    super()
    this.name = 'ExceptionResourceFound'
    this.message = message ? message : `Resource already exist`
  }
}
