// Value Object
export class Item {
  constructor(
    readonly idProduct: number,
    readonly price: number,
    readonly quantity: number,
  ) {
    if (quantity <= 0) throw new Error('Invalid quantity')
  }

  getTotal(): number {
    return this.price * this.quantity
  }
}
