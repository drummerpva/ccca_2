import { describe, expect, test } from 'vitest'
import { Product } from '../../src/domain/entity/Product'

describe('Product', () => {
  test('Should calculate volume', () => {
    const product = new Product(1, 'A', 1000, 100, 30, 10, 3)
    expect(product.getVolume()).toBe(0.03)
  })
  test('Should calculate density', () => {
    const product = new Product(1, 'A', 1000, 100, 30, 10, 3)
    expect(product.getDensity()).toBe(100)
  })
  test('Should not create with invalid dimension', () => {
    expect(() => new Product(1, 'A', 1000, -100, -30, -10, 3)).toThrow(
      'Invalid dimension',
    )
  })
  test('Should not create with invalid weight', () => {
    expect(() => new Product(1, 'A', 1000, 100, 30, 10, -3)).toThrow(
      'Invalid weight',
    )
  })
})
