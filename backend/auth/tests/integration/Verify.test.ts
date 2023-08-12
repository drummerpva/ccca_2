import { describe, test, expect } from 'vitest'
import { Verify } from '../../src/application/usecase/Verfiy'
import { User } from '../../src/domain/entity/User'
import { TokenGenerator } from '../../src/domain/service/TokenGenerator'

describe('Verify', () => {
  test('should verify', async () => {
    const sut = new Verify()
    const email = 'teste@teste.com'
    const user = User.create(email, 'abc123')
    const tokenGenerator = new TokenGenerator('secret')
    const token = tokenGenerator.sign(user, new Date('2023-08-04T10:00:00'))
    const output = await sut.execute(token)
    expect(output.email).toBe(email)
  })
})
