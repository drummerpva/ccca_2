import { ProductRepository } from '../repository/ProductRepository'
import { RepositoryFactory } from '../factory/RepositoryFactory'

type Output = {
  idProduct: number
  description: string
  price: number
  width: number
  height: number
  length: number
  weight: number
  volume: number
  density: number
}
export class GetProduct {
  private productRepository: ProductRepository

  constructor(repositoryFactory: RepositoryFactory) {
    this.productRepository = repositoryFactory.createProductRepository()
  }

  async execute(idProduct: number): Promise<Output> {
    const product = await this.productRepository.get(idProduct)
    return {
      idProduct: product.idProduct,
      description: product.description,
      price: product.price,
      width: product.width,
      height: product.height,
      length: product.length,
      weight: product.weight,
      volume: product.getVolume(),
      density: product.getDensity(),
    }
  }
}
