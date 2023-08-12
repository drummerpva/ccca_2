import {
  FreightGateway,
  Input,
  Output,
} from '../../application/gateway/FreightGateway'
import { HttpClient } from '../http/HttpClient'

export class HttpFreightGateway implements FreightGateway {
  constructor(readonly httpClient: HttpClient) {}

  async simulateFreight(input: Input): Promise<Output> {
    const data = await this.httpClient.post(
      'http://localhost:3002/simulateFreight',
      input,
    )
    return {
      freight: data.freight,
    }
  }
}
