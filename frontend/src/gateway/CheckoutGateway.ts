import { Order } from '../entity/Order'
import { Product } from '../entity/Product'

export interface CheckoutGateway {
  getProducts(): Promise<Product[]>
  checkout(order: Order): Promise<any>
}
