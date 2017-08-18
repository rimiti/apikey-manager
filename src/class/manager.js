import Resource from './resource'
import Common from './common'
import jwt from 'jsonwebtoken'
import {ExceptionKeyFound} from '../exceptions'

export default class Manager extends Resource {

  constructor(config) {
    super(config)
  }

  create(resources, key, payload = {}) {
    return new Promise(resolve => {
      Common.isArrayOrString(resources, 'resource')

      let options = this.jwt.options
      for (let attribute in options) {
        if (!options[attribute]) delete options[attribute]
      }
      return resolve(key ? key : jwt.sign(payload, this.jwt.secret, options))
    })
      .then(token => {
        return this.apikeyExist(token)
          .then(item => {
            if (item) throw new ExceptionKeyFound(`Key ${token} already exist`)
            return this.redis.hsetAsync(this.mq.topic, token, resources)
          })
          .then(() => Promise.resolve({key: token, resources}))
      })
      .catch(e => console.log(e))
  }

  apikeyExist(key) {
    return this.redis.hgetAsync(this.mq.topic, key)
      .then(item => !!item)
  }


}
