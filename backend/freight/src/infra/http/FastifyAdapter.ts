import { HttpServer } from './HttpServer'
import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  HTTPMethods,
} from 'fastify'
import cors from '@fastify/cors'

// Framework and Driver
export class FastifyAdapter implements HttpServer {
  server: FastifyInstance
  constructor() {
    this.server = Fastify()
    this.server.register(cors, {
      origin: '*',
    })
  }

  on(
    method: string,
    url: string,
    callback: (params: any, body: any, headers: any) => Promise<any>,
  ): void {
    this.server.route({
      method: method as HTTPMethods,
      url,
      handler: async (req: FastifyRequest, res: FastifyReply) => {
        try {
          const output = await callback(req.params, req.body, req.headers)
          res.send(output)
        } catch (error: any) {
          res.code(422).send({ message: error.message })
        }
      },
    })
  }

  listen(port: number): void {
    this.server.listen({ port }, (err: any, address: any) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`Server running at ${address}`)
    })
  }
}
