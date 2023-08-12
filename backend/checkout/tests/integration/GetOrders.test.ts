import { describe, test, expect } from 'vitest'
import { DatabaseRepositoryFactory } from '../../src/infra/factory/DatabaseRepositoryFactory'
import { MysqlDatabaseConnection } from '../../src/infra/database/MysqlDatabaseConnection'
import { HttpGatewayFactory } from '../../src/infra/factory/HttpGatewayFactory'
import { AxiosAdapter } from '../../src/infra/http/AxiosAdapter'
import { GetOrders as GetOrdersQuery } from '../../src/application/query/GetOrders'
import { DatabaseOrderDAO } from '../../src/infra/dao/DatabaseOrderDAO'
import { GetOrders } from '../../src/application/usecase/GetOrders'

describe('GetOrders', () => {
  test('Should get orders Command Model', async () => {
    const connection = new MysqlDatabaseConnection()
    await connection.connect()
    const httpClient = new AxiosAdapter()
    const gatewayFactory = new HttpGatewayFactory(httpClient)
    const repositoryFactory = new DatabaseRepositoryFactory(connection)
    const sut = new GetOrders(repositoryFactory, gatewayFactory)
    const output = await sut.execute()
    expect(output).toBeInstanceOf(Array)
    await connection.close()
  })
  test('Should get orders Query Model', async () => {
    const connection = new MysqlDatabaseConnection()
    await connection.connect()
    const orderDAO = new DatabaseOrderDAO(connection)
    const sut = new GetOrdersQuery(orderDAO)
    const output = await sut.execute()
    expect(output).toBeInstanceOf(Array)
    await connection.close()
  })
})
