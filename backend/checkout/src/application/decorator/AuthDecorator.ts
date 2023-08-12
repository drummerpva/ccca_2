import { AuthGateway } from '../gateway/AuthGateway'
import { GatewayFactory } from '../gateway/GatewayFactory'
import { Usecase } from '../usecase/Usecase'

export class AuthDecorator implements Usecase {
  authGateway: AuthGateway
  constructor(
    private usecase: Usecase,
    private gatewayFactory: GatewayFactory,
  ) {
    this.authGateway = gatewayFactory.createAuthGateway()
  }

  async execute(input: any): Promise<any> {
    if (input.token) {
      const session = await this.authGateway.verify(input.token)
      if (!session) {
        throw new Error('Invalid token')
      }
    }
    Reflect.deleteProperty(input, 'token')
    return this.usecase.execute(input)
  }
}
