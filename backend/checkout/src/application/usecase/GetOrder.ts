import { OrderRepository } from '../repository/OrderRepository'
import { RepositoryFactory } from '../factory/RepositoryFactory'
import { GatewayFactory } from '../gateway/GatewayFactory'
import { Usecase } from './Usecase'

type Input = {
  idOrder: string
}

type Output = {
  total: number
  code: string
  items: any[]
  cpf: string
}
export class GetOrder implements Usecase {
  private orderRepository: OrderRepository
  constructor(
    repositoryFactory: RepositoryFactory,
    gatewayFactory: GatewayFactory,
  ) {
    this.orderRepository = repositoryFactory.createOrderRepository()
  }

  async execute({ idOrder }: Input): Promise<Output> {
    const order = await this.orderRepository.getById(idOrder)
    if (!order) {
      throw new Error('Order not found')
    }
    return {
      total: Number(order.getTotal()),
      code: order.code,
      items: order.items,
      cpf: order.cpf.value,
    }
  }
}
