import manager from '../class'

manager.configure({
    redis: {
      host: "127.0.0.1",
      port: 6379
    },
    jwt: {
      algorithm: "HS256",
      secret: "secret",
      expiresIn: "",
      notBefore: "",
      audience: "",
      issuer: "",
      jwtid: "",
      subject: "",
      noTimestamp: "",
      header: "",
      keyid: ""
    }
  }
)

export default manager
