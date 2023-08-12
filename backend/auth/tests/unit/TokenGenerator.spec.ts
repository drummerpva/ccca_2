import { expect, test, describe } from 'vitest'
import { TokenGenerator } from '../../src/domain/service/TokenGenerator'
import { User } from '../../src/domain/entity/User'

describe('TokenGenerator', () => {
  test('should generate a token', () => {
    const sut = new TokenGenerator('secret')
    const user = User.create('teste@teste.com', 'abc123')
    const token = sut.sign(user, new Date('2023-08-04T10:00:00'))
    expect(token).toBeDefined()
    expect(token).toBe(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsImlhdCI6MTY5MTE1NDAwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ.pmuJDX8gLddx3sgUlP7NcQhj7ogbzyX07tStFxzTgQE',
    )
  })
  test('should verify a token', () => {
    const sut = new TokenGenerator('secret')
    const email = 'teste@teste.com'
    const user = User.create(email, 'abc123')
    const token = sut.sign(user, new Date('2023-08-04T10:00:00'))
    const output = sut.verify(token)
    expect(output.email).toBe(email)
  })
  test('should return if invalid token provided', () => {
    const sut = new TokenGenerator('secret')
    const email = 'teste@teste.com'
    const user = User.create(email, 'abc123')
    sut.sign(user, new Date('2023-08-04T10:00:00'))
    const output = sut.verify('invalid_token')
    expect(output).toBeUndefined()
  })
})
