import {Exception} from '../base'

export class ExceptionResourceFound extends Exception {

  constructor(message) {
    super()
    this.name = this.constructor.name
    this.message = message ? message : `Resource already exist`
  }
}
