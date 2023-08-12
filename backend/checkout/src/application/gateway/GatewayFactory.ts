import { AuthGateway } from './AuthGateway'
import { CatalogGateway } from './CatalogGateway'
import { EmailGateway } from './EmailGateway'
import { FreightGateway } from './FreightGateway'

export interface GatewayFactory {
  createCatalogGateway(): CatalogGateway
  createFreightGateway(): FreightGateway
  createEmailGateway(): EmailGateway
  createAuthGateway(): AuthGateway
}
