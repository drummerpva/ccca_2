import { HttpServer } from './HttpServer'
import { UsecaseFactory } from '../factory/UsecaseFactory'

// Interface adapter
export class HttpController {
  constructor(httpServer: HttpServer, usecaseFactory: UsecaseFactory) {
    httpServer.on('post', '/verify', async (_, body) => {
      const verify = usecaseFactory.createVerify()
      const output = await verify.execute(body.token)
      return output
    })
  }
}
