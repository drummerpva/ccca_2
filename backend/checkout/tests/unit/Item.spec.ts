import { describe, test, expect } from 'vitest'
import { Item } from '../../src/domain/ValueObject/Item'

describe('Item', () => {
  test('Should create a new item', () => {
    const item = new Item(1, 1000, 2)
    expect(item).toBeDefined()
  })
  test('Should return correct total', () => {
    const item = new Item(1, 1000, 2)
    expect(item.getTotal()).toBe(2000)
  })
  test('Should not create with invalid quantity', () => {
    expect(() => new Item(1, 1000, -1)).toThrow(new Error('Invalid quantity'))
  })
})
