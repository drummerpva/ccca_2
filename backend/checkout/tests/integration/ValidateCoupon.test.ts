import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import { ValidateCoupon } from '../../src/application/usecase/ValidateCoupon'
import { DatabaseRepositoryFactory } from '../../src/infra/factory/DatabaseRepositoryFactory'
import { RepositoryFactory } from '../../src/application/factory/RepositoryFactory'
import { MysqlDatabaseConnection } from '../../src/infra/database/MysqlDatabaseConnection'
import { DatabaseConnection } from '../../src/infra/database/DatabaseConnection'

describe('ValidateCoupon', () => {
  let repositoryFactory: RepositoryFactory
  let connection: DatabaseConnection
  beforeAll(async () => {
    const connection = new MysqlDatabaseConnection()
    await connection.connect()
    repositoryFactory = new DatabaseRepositoryFactory(connection)
  })
  afterAll(async () => {
    if (connection) await connection.close()
  })
  test('Should validate coupon', async () => {
    const sut = new ValidateCoupon(repositoryFactory)
    const input = {
      code: 'VALE20',
    }
    const output = await sut.execute(input)
    expect(output.isValid).toBe(true)
  })
  test('Should invalidate expired coupon', async () => {
    const sut = new ValidateCoupon(repositoryFactory)
    const input = {
      code: 'VALE20',
      date: new Date('2024-10-10'),
    }
    const output = await sut.execute(input)
    expect(output.isValid).toBe(false)
  })
  test('Should invalidate not found coupon', async () => {
    const sut = new ValidateCoupon(repositoryFactory)
    const input = {
      code: 'VALE10',
    }
    const output = await sut.execute(input)
    expect(output.isValid).toBe(false)
  })
})
