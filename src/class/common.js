import bluebird from 'bluebird'
import Redis from 'redis'
import mockRedis from 'redis-mock'

export default class Common {

  /**
   * @description Instatiate Redis and promisified it
   */
  constructor(config) {
    this.hydrate(config, Common.itemsToHydrate())
    if (process.env.NODE_ENV === 'test') {
      bluebird.promisifyAll(mockRedis.RedisClient.prototype)
      this.redis = mockRedis.createClient({host: this.mq.hostname, port: this.mq.port})
    } else {
      bluebird.promisifyAll(Redis.RedisClient.prototype)
      this.redis = Redis.createClient({host: this.mq.hostname, port: this.mq.port})
    }
  }

  /**
   * @description Get redis object
   * @return {*}
   */
  get redis() {
    return this._redis
  }

  /**
   * @description Set redis object
   * @return {*}
   */
  set redis(value) {
    this._redis = value
  }

  /**
   * @description Get mq object
   * @return {*}
   */
  get mq() {
    return this._mq
  }

  /**
   * @description Set mq object
   * @return {*}
   */
  set mq(value) {
    this._mq = value
  }

  /**
   * @description Get jwt object
   * @return {*}
   */
  get jwt() {
    return this._jwt
  }

  /**
   * @description Set jwt object
   * @return {*}
   */
  set jwt(value) {
    this._jwt = value
  }

  /**
   * @description Hydrate current instance with obj attributes
   * @param obj
   * @param attributes
   */
  hydrate(obj, attributes) {
    if (!obj) return
    for (let item of attributes) {
      this[item] = (obj[item]) ? obj[item] : ''
    }
  }

  /**
   * @description Return all fields to hydrate
   * @return {[]}
   */
  static itemsToHydrate() {
    return ['mq', 'jwt']
  }

  /**
   * @description Check item is array or string type
   * @param item
   * @param name
   * @return {boolean}
   */
  static isArrayOrString(item, name) {
    if (!Array.isArray(item) || typeof item !== 'string') throw new Error(`${name} isn't array of string type`)
    return true
  }

}
