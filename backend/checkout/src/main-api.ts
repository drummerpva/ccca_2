/* eslint-disable no-new */
import { DatabaseRepositoryFactory } from './infra/factory/DatabaseRepositoryFactory'
import { FastifyAdapter } from './infra/http/FastifyAdapter'
import { HttpController } from './infra/http/HttpController'
import { MysqlDatabaseConnection } from './infra/database/MysqlDatabaseConnection'
import { UsecaseFactory } from './infra/factory/UsecaseFactory'
import { AxiosAdapter } from './infra/http/AxiosAdapter'
import { HttpGatewayFactory } from './infra/factory/HttpGatewayFactory'
import { RabbitMQAdapter } from './infra/queue/RabbitMQAdapter'
import { QueueController } from './infra/queue/QueueController'

// main
const connection = new MysqlDatabaseConnection()
;(async () => {
  await connection.connect()
  const repositoryFactory = new DatabaseRepositoryFactory(connection)
  const httpClient = new AxiosAdapter()
  const gatewayFactory = new HttpGatewayFactory(httpClient)
  const queue = new RabbitMQAdapter()
  await queue.connect()
  const usecaseFactory = new UsecaseFactory(
    repositoryFactory,
    gatewayFactory,
    queue,
  )
  // const httpServer = new ExpressAdapter()
  // const httpServer = new HapiAdapter()
  const httpServer = new FastifyAdapter()
  new HttpController(httpServer, usecaseFactory, queue)
  new QueueController(queue, usecaseFactory)
  httpServer.listen(3000)
})()
