import { CheckoutGateway } from './CheckoutGateway'
import { Order } from '../entity/Order'
import { Product } from '../entity/Product'
import { HttpClient } from '../http/HttpClient'

export class HttpCheckoutGateway implements CheckoutGateway {
  constructor(private httpClient: HttpClient) {}

  async getProducts(): Promise<Product[]> {
    const response = await this.httpClient.get('http://localhost:3000/products')
    return response.map(
      (product: any) =>
        new Product(product.idProduct, product.description, product.price),
    )
  }

  async checkout(order: Order): Promise<any> {
    const response = await this.httpClient.post(
      'http://localhost:3000/checkout',
      order,
    )
    return response
  }
}
