import { ZipcodeGateway } from './ZipcodeGateway'

export interface GatewayFactory {
  createZipcodeGateway(): ZipcodeGateway
}
