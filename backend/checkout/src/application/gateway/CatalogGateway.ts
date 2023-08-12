import { Product } from '../../domain/entity/Product'

export interface CatalogGateway {
  getProduct(idProduct: number): Promise<Product>
  getProducts(): Promise<Product[]>
}
