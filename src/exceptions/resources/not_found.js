import {Exception} from '../base'

export class ExceptionResourceNotFound extends Exception {

  constructor(message) {
    super()
    this.name = this.constructor.name
    this.message = message ? message : `Resource not found`
  }
}
