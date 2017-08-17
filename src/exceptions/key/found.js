import Exception from '../base'

export default class ExceptionKeyFound extends Exception {

  constructor(message) {
    super()
    this.name = 'ExceptionKeyFound'
    this.message = message ? message : `Key already exist`
  }
}
