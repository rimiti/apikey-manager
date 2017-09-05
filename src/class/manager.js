import {Resource} from './resource'
import jwt from 'jsonwebtoken'
import {ExceptionKeyFound} from '../exceptions'

export class Manager extends Resource {

  constructor(config) {
    super(config)
  }

  /**
   * @description Create key associated to resource
   * @param resources
   * @param key
   * @return {Promise.<TResult>}
   */
  create(resources, key = {}) {
    return this.generateKey(key)
      .then(token => {
        return this.findAll(token)
          .then(item => {
            if (item) throw new ExceptionKeyFound(`Key ${token} already exist`)
            return this.redis.hsetAsync(this.mq.topic, token, JSON.stringify(resources))
          })
          .then(() => Promise.resolve({key: token, resources}))
      })
  }

  /**
   * @description Generate key
   * @param key
   * @return {Promise}
   */
  generateKey(key) {
    return new Promise(resolve => {
      if (typeof key === 'object') {
        let options = this.jwt.options
        for (let attribute in options) {
          if (!options[attribute]) delete options[attribute]
        }
        return resolve(jwt.sign(key, this.jwt.secret, options))
      }
      return resolve(key)
    })
  }

}
