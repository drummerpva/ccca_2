import { HttpServer } from './HttpServer'
import { UsecaseFactory } from '../factory/UsecaseFactory'

// Interface adapter
export class HttpController {
  constructor(httpSrver: HttpServer, usecaseFactory: UsecaseFactory) {
    httpSrver.on('post', '/simulateFreight', async (_, body) => {
      const simulateFreight = usecaseFactory.createSimulateFreight()
      const output = await simulateFreight.execute(body)
      return output
    })
  }
}
