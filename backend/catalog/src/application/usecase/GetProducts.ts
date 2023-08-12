import { Presenter } from '../../infra/presenter/Presenter'
import { ProductRepository } from '../repository/ProductRepository'
import { RepositoryFactory } from '../factory/RepositoryFactory'

type Output = {
  idProduct: number
  description: string
  price: number
}
export class GetProducts {
  private productRepository: ProductRepository

  constructor(
    repositoryFactory: RepositoryFactory,
    private presenter: Presenter,
  ) {
    this.productRepository = repositoryFactory.createProductRepository()
  }

  async execute(): Promise<any> {
    const products = await this.productRepository.list()
    const output = products.map<Output>((product) => ({
      idProduct: product.idProduct,
      description: product.description,
      price: product.price,
    }))
    return await this.presenter.present(output)
  }
}
