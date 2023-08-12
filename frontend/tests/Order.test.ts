import { Order } from '../src/entity/Order'
import { Product } from '../src/entity/Product'

describe('Order', () => {
  test('should test order', () => {
    const order = new Order('123', '123')
    order.addItem(new Product(1, 'Guitarra', 1000))
    order.addItem(new Product(1, 'Guitarra', 1000))
    order.addItem(new Product(1, 'Guitarra', 1000))
    expect(order.getTotal()).toBe(3000)
    expect(order.items.length).toBe(1)
  })
})
