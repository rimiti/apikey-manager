import Resource from './resource'
import jwt from 'jsonwebtoken'
import {ExceptionKeyFound} from '../exceptions'

export default class Manager extends Resource {

  constructor(config) {
    super(config)
  }

  create(resources, payload = {}) {
    return new Promise(resolve => {
      if (!Array.isArray(resources) && typeof resources !== 'string') throw new Error(`Parameter "resources" isn't array of string type`)
      if (typeof resources === 'string') resources = [resources]

      let options = this.jwt.options
      for (let attribute in options) {
        if (!options[attribute]) delete options[attribute]
      }
      return resolve(typeof payload === 'object' ? jwt.sign(payload, this.jwt.secret, options) : payload)
        })
      .then(token => {
        return this.apikeyExist(token)
          .then(item => {
            if (item) throw new ExceptionKeyFound(`Key ${token} already exist`)
            return this.redis.hsetAsync(this.mq.topic, token, JSON.stringify(resources))
          })
          .then(() => Promise.resolve({key: token, resources}))
      })
  }

  apikeyExist(key) {
    return this.redis.hgetAsync(this.mq.topic, key)
      .then(item => !!item)
  }


}
