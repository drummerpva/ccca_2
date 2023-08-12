import { describe, test, expect } from 'vitest'
import { MysqlDatabaseConnection } from '../../src/infra/database/MysqlDatabaseConnection'
import { DatabaseRepositoryFactory } from '../../src/infra/factory/DatabaseRepositoryFactory'
import { GetProduct } from '../../src/application/usecase/GetProduct'

describe('GetProduct', () => {
  // main
  test('should return one product', async () => {
    // Framework and drievrs
    const connection = new MysqlDatabaseConnection()
    await connection.connect()
    // Interface adapter
    const repositoryFactory = new DatabaseRepositoryFactory(connection)
    // use case / application
    const sut = new GetProduct(repositoryFactory)
    const product = await sut.execute(1)
    expect(product.idProduct).toBe(1)
    expect(product.description).toBe('Guitarra')
    expect(product.price).toBe(1000)
    expect(product.width).toBe(100)
    expect(product.height).toBe(30)
    expect(product.length).toBe(10)
    expect(product.weight).toBe(3)
    expect(product.volume).toBe(0.03)
    expect(product.density).toBe(100)
  })
})
