import manager from '../class'

manager.configure({
    redis: {
      host: "127.0.0.1",
      port: 6379
    },
    jwt: {
      secret: "secret",
      options: {
        algorithm: "HS256",
        expiresIn: null,
        notBefore: null,
        audience: null,
        issuer: null,
        jwtid: null,
        subject: null,
        noTimestamp: null,
        header: null,
        keyid: null
      }
    }
  }
)

export default manager
