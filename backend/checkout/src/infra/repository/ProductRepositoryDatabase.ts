import { ProductRepository } from '../../application/repository/ProductRepository'
import { Product } from '../../domain/entity/Product'
import { DatabaseConnection } from '../database/DatabaseConnection'

// Interface Adapter
export class ProductRepositoryDatabase implements ProductRepository {
  constructor(private databaseConnection: DatabaseConnection) {}
  async list(): Promise<Product[]> {
    const productsData = await this.databaseConnection.query(
      'select * from branas.product',
    )
    return productsData.map(
      (productData: any) =>
        new Product(
          productData.id,
          productData.nome,
          Number(productData.valor),
          productData.largura,
          productData.altura,
          productData.profundidade,
          Number(productData.peso),
        ),
    )
  }

  async get(idProduct: number): Promise<Product> {
    const [productData] = await this.databaseConnection.query(
      'select * from branas.product where id = ?',
      [idProduct],
    )
    if (!productData) throw new Error('Product not found')
    return new Product(
      productData.id,
      productData.descricao,
      Number(productData.valor),
      productData.largura,
      productData.altura,
      productData.profundidade,
      Number(productData.peso),
    )
  }
}
