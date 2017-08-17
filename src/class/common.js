import bluebird from 'bluebird'
import Redis from 'redis'
import mockRedis from 'redis-mock'

export default class Common {

  /**
   * @description Instatiate Redis and promisified it
   */
  constructor() {
    if (process.env.NODE_ENV === 'test') {
      bluebird.promisifyAll(mockRedis.RedisClient.prototype)
      this.redis = mockRedis.createClient({host: this.hostname, port: this.port})
    } else {
      bluebird.promisifyAll(Redis.RedisClient.prototype)
      this.redis = Redis.createClient({host: this.hostname, port: this.port})
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

}
