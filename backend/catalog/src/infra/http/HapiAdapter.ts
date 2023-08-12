import { HttpServer } from './HttpServer'
import Hapi, { Request, ResponseToolkit } from '@hapi/hapi'
// Framework and Driver
export class HapiAdapter implements HttpServer {
  server: Hapi.Server
  constructor() {
    this.server = Hapi.server({})
  }

  on(
    method: string,
    url: string,
    callback: (params: any, body: any) => Promise<any>,
  ): void {
    this.server.route({
      method,
      path: url,
      handler: async (req: Request, res: ResponseToolkit) => {
        try {
          const output = await callback(req.params, req.payload)
          return output
        } catch (error: any) {
          return res.response({ message: error.message }).code(422)
        }
      },
    })
  }

  listen(port: number): void {
    this.server.settings.port = port
    this.server.start()
    console.log(`Server running at localhost:${port}`)
  }
}
