import { HttpServer } from './HttpServer'
import { UsecaseFactory } from '../factory/UsecaseFactory'
import { Queue } from '../queue/Queue'

// Interface adapter
export class HttpController {
  constructor(
    httpServer: HttpServer,
    usecaseFactory: UsecaseFactory,
    queue: Queue,
  ) {
    httpServer.on('post', '/checkout', async (_, body: any) => {
      const checkout = usecaseFactory.createCheckout()
      const output = await checkout.execute(body)
      return output
    })
    httpServer.on('post', '/checkoutAsync', async (_, body: any) => {
      // Command
      await queue.publish('checkout', body)
    })
    httpServer.on(
      'get',
      '/orders/:idOrder',
      async (params: any, body: any, headers: any) => {
        const getOrder = usecaseFactory.createGetOrder()
        const output = await getOrder.execute({
          idOrder: params.idOrder,
          token: headers?.token ?? undefined,
        })
        return output
      },
    )
  }
}
