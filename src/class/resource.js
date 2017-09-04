import {Common} from './common'
import {ExceptionResourceNotFound} from '../exceptions'

export class Resource extends Common {

  constructor(config) {
    super(config)
  }

  /**
   * @description Add one or multiple resources
   * @param {Array|String} resources
   */
  add(resources, key) {
    if (!Array.isArray(resources) && typeof resources !== 'string') throw new Error(`Parameter "resources" isn't array or string type`)
    return this.find(resources, key)
      .then(results => {
        if (Array.isArray(resources) && (resources.length !== results.length)) {
          if (typeof resources === 'string') {
            // TODO: Check if this resource already exists and throw an error (in safe mode only)
            return this.redis.hsetAsync(this.mq.topic, key, JSON.stringify(resources))
          }
          // TODO: Check for each resources if they already exists and throw an error (in safe mode only)
          return this.redis.hsetAsync(this.mq.topic, key, JSON.stringify(resources))
        }
      })
  }

  /**
   * @description Get one or multiple resources
   * @param resources
   * @param key
   * @return {Promise.<TResult>|Promise.<*>}
   */
  find(resources, key) {
    if (!Array.isArray(resources) && typeof resources !== 'string') throw new Error(`Parameter "resources" isn't array or string type`)
    return this.redis.hgetAsync(this.mq.topic, key)
      .then(result => {
        if (typeof resources === 'string') {
          for (let item of JSON.parse(result)) {
            if (resources === item) return Promise.resolve(item)
          }
        } else {
          let output = []
          for (let resourceItem of resources) {
            for (let mqItem of JSON.parse(result)) {
              if (resourceItem === mqItem) output.push(mqItem)
            }
          }
          return Promise.resolve(output)
        }
      })
  }

  /**
   * @description Find all resources
   * @param key
   * @return {*}
   */
  findAll(key) {
    return this.redis.hgetAsync(this.mq.topic, key)
  }

  /**
   * @description Remove one or multiple resources
   * @param resources
   * @param key
   * @return {Promise.<TResult>}
   */
  remove(resources, key) {
    if (!Array.isArray(resources) && typeof resources !== 'string') throw new Error(`Parameter "resources" isn't array or string type`)
    return this.find(resources, key)
      .then(result => {
        if (!result) throw new ExceptionResourceNotFound(`Resource ${JSON.stringify(resources)} not found`)

        if (typeof resources === 'string') {
          for (let item of JSON.parse(result)) {
            if (resources === item) return Promise.resolve(item)
          }
        } else {
          let output = []
          for (let resourceItem of resources) {
            for (let mqItem of JSON.parse(result)) {
              if (resourceItem === mqItem) output.concat(mqItem)
            }
          }
          return Promise.resolve(output)
        }
      })
  }

  /**
   * @description Remove all resources
   * @param key
   * @return {*}
   */
  removeAll(key) {
    return this.redis.hdelAsync(this.mq.topic, key)
  }

  _format() {

  }

}
