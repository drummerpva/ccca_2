/* eslint-disable no-new */
import { DatabaseRepositoryFactory } from './infra/factory/DatabaseRepositoryFactory'
import { FastifyAdapter } from './infra/http/FastifyAdapter'
import { HttpController } from './infra/http/HttpController'
import { MysqlDatabaseConnection } from './infra/database/MysqlDatabaseConnection'
import { UsecaseFactory } from './infra/factory/UsecaseFactory'
import { AxiosAdapter } from './infra/http/AxiosAdapter'
import { RemoteGatewayFactory } from './infra/gateway/RemoteGatewayFactory'

// main
const connection = new MysqlDatabaseConnection()
;(async () => {
  await connection.connect()
  const repositoryFactory = new DatabaseRepositoryFactory(connection)
  const httpClient = new AxiosAdapter()
  const gatewayFactory = new RemoteGatewayFactory(httpClient)
  const usecaseFactory = new UsecaseFactory(repositoryFactory, gatewayFactory)
  // const httpServer = new ExpressAdapter()
  // const httpServer = new HapiAdapter()
  const httpServer = new FastifyAdapter()
  new HttpController(httpServer, usecaseFactory)
  httpServer.listen(3002)
})()
