import { GatewayFactory } from '../../application/gateway/GatewayFactory'
import { ZipcodeGateway } from '../../application/gateway/ZipcodeGateway'
import { HttpClient } from '../http/HttpClient'
import { NominatimZipcodeAdapter } from './NominatimZipcodeAdapter'

export class RemoteGatewayFactory implements GatewayFactory {
  constructor(private httpClient: HttpClient) {}
  createZipcodeGateway(): ZipcodeGateway {
    return new NominatimZipcodeAdapter(this.httpClient)
  }
}
