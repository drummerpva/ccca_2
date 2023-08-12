import { Checkout } from '../../application/usecase/Checkout'
import { RepositoryFactory } from '../../application/factory/RepositoryFactory'
import { GatewayFactory } from '../../application/gateway/GatewayFactory'
import { GetOrder } from '../../application/usecase/GetOrder'
import { AuthDecorator } from '../../application/decorator/AuthDecorator'
import { Queue } from '../queue/Queue'

export class UsecaseFactory {
  constructor(
    private repositoryFactory: RepositoryFactory,
    private gatewayFactory: GatewayFactory,
    private queue: Queue,
  ) {}

  createCheckout() {
    return new Checkout(this.repositoryFactory, this.gatewayFactory, this.queue)
  }

  createGetOrder() {
    return new AuthDecorator(
      new GetOrder(this.repositoryFactory, this.gatewayFactory),
      this.gatewayFactory,
    )
  }
}
