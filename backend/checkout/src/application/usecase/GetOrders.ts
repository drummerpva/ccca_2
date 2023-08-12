import { OrderRepository } from '../repository/OrderRepository'
import { RepositoryFactory } from '../factory/RepositoryFactory'
import { GatewayFactory } from '../gateway/GatewayFactory'
import { Usecase } from './Usecase'
import { CatalogGateway } from '../gateway/CatalogGateway'

type Item = {
  description: string
  price: number
  quantity: number
}

type Output = {
  idOrder: string
  items: Item[]
  date: Date
}
export class GetOrders implements Usecase {
  private orderRepository: OrderRepository
  private catalogGateway: CatalogGateway
  constructor(
    repositoryFactory: RepositoryFactory,
    gatewayFactory: GatewayFactory,
  ) {
    this.orderRepository = repositoryFactory.createOrderRepository()
    this.catalogGateway = gatewayFactory.createCatalogGateway()
  }

  async execute(): Promise<Output[]> {
    const output: Output[] = []
    const orders = await this.orderRepository.list()
    for (const order of orders) {
      const items: Item[] = []
      for (const item of order.items) {
        const product = await this.catalogGateway.getProduct(item.idProduct)
        items.push({
          description: product.description,
          price: product.price,
          quantity: item.quantity,
        })
      }
      output.push({
        idOrder: order.id,
        items,
        date: order.date,
      })
    }

    return output
  }
}
