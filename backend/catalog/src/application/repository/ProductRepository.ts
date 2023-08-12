import { Product } from '../../domain/entity/Product'

export interface ProductRepository {
  get(idProduct: number): Promise<Product>
  list(): Promise<Product[]>
}
