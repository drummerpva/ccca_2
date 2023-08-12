import { randomUUID } from 'crypto'
import { describe, test, expect } from 'vitest'
import { Order } from '../../src/domain/entity/Order'
import { Product } from '../../src/domain/entity/Product'
import { Coupon } from '../../src/domain/entity/Coupon'

describe('Order', () => {
  const currentDate = new Date()
  test('Should not create with invalid CPF', () => {
    const idOrder = randomUUID()
    const cpf = '987.654.321-11'
    expect(() => new Order(idOrder, cpf, currentDate)).toThrow(
      new Error('Invalid cpf'),
    )
  })
  test('Should create a new empty order', () => {
    const idOrder = randomUUID()
    const cpf = '987.654.321-00'
    const order = new Order(idOrder, cpf, currentDate)
    expect(order.getTotal()).toBe(0)
  })
  test('Should create a new order with 3 items', () => {
    const idOrder = randomUUID()
    const cpf = '987.654.321-00'
    const order = new Order(idOrder, cpf, currentDate)
    order.addItem(new Product(1, 'A', 1000, 100, 30, 10, 3.0), 1)
    order.addItem(new Product(2, 'B', 5000, 50, 50, 50, 22.0), 1)
    order.addItem(new Product(3, 'C', 30, 10, 10, 10, 0.9), 3)
    expect(order.getTotal()).toBe(6090)
  })
  test('Should not add duplicated item', () => {
    const idOrder = randomUUID()
    const cpf = '987.654.321-00'
    const order = new Order(idOrder, cpf, currentDate)
    order.addItem(new Product(1, 'A', 1000, 100, 30, 10, 3.0), 1)
    expect(() =>
      order.addItem(new Product(1, 'A', 1000, 100, 30, 10, 3.0), 1),
    ).toThrow(new Error('Duplicated item'))
  })
  test('Should create a new order and generate code', () => {
    const idOrder = randomUUID()
    const cpf = '987.654.321-00'
    const order = new Order(idOrder, cpf, new Date('2023-10-01:10:00:00'), 1)
    expect(order.code).toBe('202300000001')
  })
  test('Should create a new order with 3 items com desconto', () => {
    const idOrder = randomUUID()
    const cpf = '987.654.321-00'
    const order = new Order(idOrder, cpf, currentDate)
    order.addItem(new Product(1, 'A', 1000, 100, 30, 10, 3.0), 1)
    order.addItem(new Product(2, 'B', 5000, 50, 50, 50, 22.0), 1)
    order.addItem(new Product(3, 'C', 30, 10, 10, 10, 0.9), 3)
    order.addCoupon(new Coupon('VALE20', 20, new Date('2023-10-01:10:00:00')))
    expect(order.getTotal()).toBe(4872)
  })
})
