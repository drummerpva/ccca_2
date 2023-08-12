import { describe, test, expect } from 'vitest'
import { FreightCalculator } from '../../src/domain/service/FreightCalculator'

describe('FreightCalculator', () => {
  test('Should calculate freight', () => {
    const freight = FreightCalculator.calculate(1000, 0.03, 100)
    expect(freight).toBe(30)
  })
  test('Should calculate freight with minimum value', () => {
    const freight = FreightCalculator.calculate(1, 0.03, 100)
    expect(freight).toBe(10)
  })
})
