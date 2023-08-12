import { describe, test, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { DatabaseRepositoryFactory } from '../../src/infra/factory/DatabaseRepositoryFactory'
import { Signup } from '../../src/application/usecase/Signup'
import { MysqlDatabaseConnection } from '../../src/infra/database/MysqlDatabaseConnection'
import { Login } from '../../src/application/usecase/Login'
import { DatabaseConnection } from '../../src/infra/database/DatabaseConnection'

const makeSut = (connection: DatabaseConnection) => {
  const repositoryFactory = new DatabaseRepositoryFactory(connection)
  const userRepository = repositoryFactory.createUserRepository()
  const login = new Login(repositoryFactory)
  const sut = new Signup(repositoryFactory)
  return {
    sut,
    login,
    userRepository,
  }
}

describe('Signup', () => {
  let connection: DatabaseConnection
  beforeAll(async () => {
    connection = new MysqlDatabaseConnection()
    await connection.connect()
  })
  beforeEach(async () => {
    const { userRepository } = makeSut(connection)
    await userRepository.clear()
  })
  afterAll(async () => {
    await connection.close()
  })
  test('should create a new user', async () => {
    const input = {
      email: 'joao@gmail.com',
      password: 'abc123',
      date: new Date('2023-08-03T10:00:00'),
    }
    const { sut, login } = makeSut(connection)
    await sut.execute(input)
    const output = await login.execute(input)
    expect(output.token).toBe(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpIjoiam9hb0BnbWFpbC5jb20iLCJpYXQiOjE2OTEwNjc2MDAwMDAsImV4cGlyZXNJbiI6MTAwMDAwMH0.01S5Vg7X90twz_2QdgLzLvK9WMXhmeKGevP33hQu5x4',
    )
  })
})
