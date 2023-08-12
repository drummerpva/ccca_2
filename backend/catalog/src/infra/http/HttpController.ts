import { HttpServer } from './HttpServer'
import { UsecaseFactory } from '../factory/UsecaseFactory'

// Interface adapter
export class HttpController {
  constructor(httpServer: HttpServer, usecaseFactory: UsecaseFactory) {
    httpServer.on('get', '/products', async (_, __, headers?: any) => {
      const contentType = headers['content-type'] ?? 'application/json'
      const getProducts = usecaseFactory.createGetProducts(contentType)
      const output = await getProducts.execute()
      return output
    })
    httpServer.on('get', '/products/:id', async (params) => {
      const getProducts = usecaseFactory.createGetProduct()
      const output = await getProducts.execute(params.id)
      return output
    })
  }
}
