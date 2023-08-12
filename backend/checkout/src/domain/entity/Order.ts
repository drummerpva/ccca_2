import { Coupon } from './Coupon'
import { Product } from './Product'
import { Cpf } from '../ValueObject/Cpf'
import { Item } from '../ValueObject/Item'
import { OrderCode } from '../ValueObject/OrderCode'

// Entity
export class Order {
  cpf: Cpf
  items: Item[]
  code: string
  orderCode: OrderCode
  freight = 0
  coupon?: Coupon
  constructor(
    readonly id: string,
    cpf: string,
    readonly date: Date = new Date(),
    readonly sequence = 1,
  ) {
    this.cpf = new Cpf(cpf)
    this.items = []
    this.orderCode = new OrderCode(date, sequence)
    this.code = this.orderCode.getCode()
  }

  addItem(product: Product, quantity: number) {
    if (this.items.some((item) => item.idProduct === product.idProduct))
      throw new Error('Duplicated item')
    this.items.push(new Item(product.idProduct, product.price, quantity))
  }

  getTotal(): number {
    let total = 0
    for (const item of this.items) {
      total += item.getTotal()
    }
    if (this.coupon) {
      total -= this.coupon.calculateDiscount(total)
    }
    total += this.freight
    return total
  }

  addCoupon(coupon: Coupon) {
    if (coupon.isValid(this.date)) {
      this.coupon = coupon
    }
  }
}
