import { CatalogGateway } from '../../application/gateway/CatalogGateway'
import { Product } from '../../domain/entity/Product'
import { HttpClient } from '../http/HttpClient'

export class HttpCatalogGateway implements CatalogGateway {
  constructor(readonly httpClient: HttpClient) {}

  async getProduct(idProduct: number): Promise<Product> {
    const productData = await this.httpClient.get(
      `http://localhost:3001/products/${idProduct}`,
    )
    return new Product(
      productData.idProduct,
      productData.description,
      productData.price,
      productData.width,
      productData.height,
      productData.length,
      productData.weight,
      productData.volume,
      productData.density,
    )
  }

  async getProducts(): Promise<Product[]> {
    const productsData = await this.httpClient.get(
      `http://localhost:3001/products`,
    )
    return productsData.map(
      (productData: any) =>
        new Product(
          productData.idProduct,
          productData.description,
          productData.price,
          productData.width,
          productData.height,
          productData.length,
          productData.weight,
          productData.volume,
          productData.density,
        ),
    )
  }
}
