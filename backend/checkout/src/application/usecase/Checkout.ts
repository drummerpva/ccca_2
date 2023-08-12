import { CouponRepository } from '../repository/CouponRepository'
import { EmailGateway } from '../gateway/EmailGateway'
import { OrderRepository } from '../repository/OrderRepository'
import { Order } from '../../domain/entity/Order'
import { RepositoryFactory } from '../factory/RepositoryFactory'
import { FreightGateway } from '../gateway/FreightGateway'
import { CatalogGateway } from '../gateway/CatalogGateway'
import { GatewayFactory } from '../gateway/GatewayFactory'
import { randomUUID } from 'crypto'
import { Usecase } from './Usecase'
import { Queue } from '../../infra/queue/Queue'
type Item = {
  idProduct: number
  quantity: number
}
type Input = {
  idOrder?: string
  cpf: string
  items?: Item[]
  from?: string
  to?: string
  coupon?: string
  email?: string
  date?: Date
}
type Output = {
  total: number
  freight: number
}
export class Checkout implements Usecase {
  private orderRepository: OrderRepository
  private couponRepository: CouponRepository
  private emailGateway: EmailGateway
  private freightGateway: FreightGateway
  private catalogGateway: CatalogGateway
  constructor(
    repositoryFactory: RepositoryFactory,
    gatewayFactory: GatewayFactory,
    readonly queue?: Queue,
  ) {
    this.orderRepository = repositoryFactory.createOrderRepository()
    this.couponRepository = repositoryFactory.createCouponRepository()
    this.emailGateway = gatewayFactory.createEmailGateway()
    this.freightGateway = gatewayFactory.createFreightGateway()
    this.catalogGateway = gatewayFactory.createCatalogGateway()
  }

  async execute(input: Input): Promise<Output> {
    const sequence = (await this.orderRepository.count()) + 1
    const order = new Order(
      input.idOrder ?? randomUUID(),
      input.cpf,
      input.date,
      sequence,
    )
    const inputFreight = []
    for (const item of input.items ?? []) {
      const product = await this.catalogGateway.getProduct(item.idProduct)
      order.addItem(product, item.quantity)
      inputFreight.push({
        volume: product.volume,
        density: product.density,
        quantity: item.quantity,
      })
    }

    if (input.from && input.to && inputFreight.length) {
      const output = await this.freightGateway.simulateFreight({
        from: input.from,
        to: input.to,
        items: inputFreight,
      })
      order.freight = output.freight
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.get(input.coupon ?? '')
      if (coupon) {
        order.addCoupon(coupon)
      }
    }
    await this.orderRepository.save(order)
    if (this.queue) await this.queue.publish('orderPlaced', order)
    if (input.email) {
      await this.emailGateway.send({
        content: `Order received with total value ${order.getTotal()}`,
        subject: 'Purchase Resume',
        from: 'no-response@enterprise.com',
        to: [input.email],
      })
    }
    return {
      total: order.getTotal(),
      freight: order.freight,
    }
  }
}
