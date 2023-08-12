import { Item } from './Item'
import { Product } from './Product'

export class Order {
  items: Item[]
  private total = 0
  constructor(
    readonly idOrder: string,
    readonly cpf: string,
  ) {
    this.items = []
  }

  addItem(product: Product) {
    this.total += product.price
    const existItem = this.items.find(
      (item: any) => item.idProduct === product.idProduct,
    )
    if (existItem) {
      existItem.quantity++
      return
    }
    this.items.push({ idProduct: product.idProduct, quantity: 1 })
  }

  getTotal() {
    return this.total
  }
}
