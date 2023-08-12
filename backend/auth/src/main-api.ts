/* eslint-disable no-new */
import { DatabaseRepositoryFactory } from './infra/factory/DatabaseRepositoryFactory'
import { FastifyAdapter } from './infra/http/FastifyAdapter'
import { HttpController } from './infra/http/HttpController'
import { MysqlDatabaseConnection } from './infra/database/MysqlDatabaseConnection'
import { UsecaseFactory } from './infra/factory/UsecaseFactory'

// main
const connection = new MysqlDatabaseConnection()
;(async () => {
  await connection.connect()
  const repositoryFactory = new DatabaseRepositoryFactory(connection)
  const usecaseFactory = new UsecaseFactory(repositoryFactory)
  // const httpServer = new ExpressAdapter()
  // const httpServer = new HapiAdapter()
  const httpServer = new FastifyAdapter()
  new HttpController(httpServer, usecaseFactory)
  httpServer.listen(3004)
})()
