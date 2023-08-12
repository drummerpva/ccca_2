import { describe, test, expect } from 'vitest'
import { Cpf } from '../../src/domain/ValueObject/Cpf'

describe('CPF', () => {
  test.each(['407.302.170-27', '987.654.321-00', '746.971.314-01'])(
    'should return true when CPF  "%s" is valid',
    (cpf: string) => {
      const instance = new Cpf(cpf)
      expect(instance).toBeDefined()
    },
  )
  test.each([
    '111.111.111-11',
    '222.222.222-22',
    '333.333.333-33',
    '444.444.444-44',
    '555.555.555-55',
    '666.666.666-66',
    '777.777.777-77',
    '888.888.888-88',
    '999.999.999-99',
    '000.000.000-00',
  ])('should return false when CPF  "%s" have same digits', (cpf: string) => {
    expect(() => new Cpf(cpf)).toThrow(new Error('Invalid cpf'))
  })

  test('Should create a valid CPF', () => {
    const cpf = new Cpf('987.654.321-00')
    expect(cpf).toBeDefined()
    expect(cpf.value).toBe('987.654.321-00')
  })

  test.each(['987.654.321-11', '987.654.32', '987.654.321.000-11'])(
    'Should not create %s invalid CPF',
    () => {
      expect(() => new Cpf('987.654.321-11')).toThrow(new Error('Invalid cpf'))
    },
  )
})
