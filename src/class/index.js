import {Manager} from './manager'
import jsonOverride from 'json-override'

let configuration

export default {

  /**
   * @description Configure manager with object config
   * @param config
   */
  configure: (config) => configuration = jsonOverride(configuration, config),

  /**
   * @description Instantiate class with configuration
   * @return {Manager}
   */
  create: () => new Manager(configuration)

}
