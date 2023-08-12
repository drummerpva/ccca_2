import { describe, test, expect } from 'vitest'
import { MysqlDatabaseConnection } from '../../src/infra/database/MysqlDatabaseConnection'
import { DatabaseRepositoryFactory } from '../../src/infra/factory/DatabaseRepositoryFactory'
import { GetProducts } from '../../src/application/usecase/GetProducts'
import { JsonPresenter } from '../../src/infra/presenter/JsonPresenter'

describe('GetProducts', () => {
  // main
  test('should return a list of products', async () => {
    // Framework and drievrs
    const connection = new MysqlDatabaseConnection()
    await connection.connect()
    const repositoryFactory = new DatabaseRepositoryFactory(connection)
    // Interface adapter
    const sut = new GetProducts(repositoryFactory, new JsonPresenter())
    const products = await sut.execute()
    expect(products).toBeInstanceOf(Array)
    expect(products).toHaveLength(3)
  })
})
