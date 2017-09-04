import {Exception} from '../base'

export class ExceptionKeyFound extends Exception {

  constructor(message) {
    super()
    this.name = this.constructor.name
    this.message = message ? message : `Key already exist`
  }
}
