import { ProductRepository } from '../repository/ProductRepository'

export interface RepositoryFactory {
  createProductRepository(): ProductRepository
}
