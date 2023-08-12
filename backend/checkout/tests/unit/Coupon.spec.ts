import { describe, test, expect } from 'vitest'
import { Coupon } from '../../src/domain/entity/Coupon'

describe('Coupon', () => {
  test('Shoul validated unexpired discount coupon', () => {
    const coupon = new Coupon('VALE20', 20, new Date('2024-10-10'))
    expect(coupon.isValid()).toBe(true)
  })
  test('Shoul validated expired discount coupon', () => {
    const coupon = new Coupon('VALE20', 20, new Date('2022-10-10'))
    expect(coupon.isValid()).toBe(false)
  })
  test('Shoul calculate the discount', () => {
    const coupon = new Coupon('VALE20', 20, new Date('2022-10-10'))
    expect(coupon.calculateDiscount(1000)).toBe(200)
  })
})
