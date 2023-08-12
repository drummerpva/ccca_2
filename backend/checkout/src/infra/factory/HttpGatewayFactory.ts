import { AuthGateway } from '../../application/gateway/AuthGateway'
import { CatalogGateway } from '../../application/gateway/CatalogGateway'
import { EmailGateway } from '../../application/gateway/EmailGateway'
import { FreightGateway } from '../../application/gateway/FreightGateway'
import { GatewayFactory } from '../../application/gateway/GatewayFactory'
import { EmailGatewayConsole } from '../gateway/EmailGatewayConsole'
import { HttpAuthGateway } from '../gateway/HttpAuthGateway'
import { HttpCatalogGateway } from '../gateway/HttpCatalogGateway'
import { HttpFreightGateway } from '../gateway/HttpFreightGateway'
import { HttpClient } from '../http/HttpClient'

export class HttpGatewayFactory implements GatewayFactory {
  constructor(private httpClient: HttpClient) {}
  createAuthGateway(): AuthGateway {
    return new HttpAuthGateway(this.httpClient)
  }

  createCatalogGateway(): CatalogGateway {
    return new HttpCatalogGateway(this.httpClient)
  }

  createFreightGateway(): FreightGateway {
    return new HttpFreightGateway(this.httpClient)
  }

  createEmailGateway(): EmailGateway {
    return new EmailGatewayConsole()
  }
}
