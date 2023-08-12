import { RepositoryFactory } from '../../application/factory/RepositoryFactory'
import { GatewayFactory } from '../../application/gateway/GatewayFactory'
import { SimulateFreight } from '../../application/usecase/SimulateFreight'

export class UsecaseFactory {
  constructor(
    private repositoryFactory: RepositoryFactory,
    private gatewayFactory: GatewayFactory,
  ) {}

  createSimulateFreight() {
    return new SimulateFreight(this.gatewayFactory)
  }
}
