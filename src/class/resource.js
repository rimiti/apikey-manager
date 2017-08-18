import Common from './common'

export default class Resource extends Common {

  constructor(config) {
    super(config)
  }

  /**
   * @description Add one or multiple resources
   * @param {Array|String} resource
   */
  add(resource, key) {
  }

  /**
   * @description Get one or multiple resources
   * @param resources
   * @param key
   * @return {Promise.<TResult>|Promise.<*>}
   */
  find(resources, key) {
    if (!Array.isArray(resources) && typeof resources !== 'string') throw new Error(`Parameter "resources" isn't array of string type`)

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
              if (resourceItem === mqItem) output.concat(mqItem)
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
   * @param {Array|String} resource
   */
  remove(resource, key) {

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
