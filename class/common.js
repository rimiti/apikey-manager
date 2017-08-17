import bluebird from 'bluebird'
import Redis from 'redis'

export default class Common {

  /**
   * @description Instantiate Redis and promisified it
   */
  constructor() {
    bluebird.promisifyAll(Redis.RedisClient.prototype)
    this.redis = Redis.createClient({host: this.hostname, port: this.port})
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

}
