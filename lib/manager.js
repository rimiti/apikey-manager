import manager from '../class'

manager.configure({
    redis: {
      host: '127.0.0.1',
      port: 6379
    }
  }
)

export default manager