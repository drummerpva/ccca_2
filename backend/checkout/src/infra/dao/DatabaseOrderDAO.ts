import { OrderDAO } from '../../application/dao/OrderDAO'
import { DatabaseConnection } from '../database/DatabaseConnection'

export class DatabaseOrderDAO implements OrderDAO {
  constructor(private databaseConnection: DatabaseConnection) {}
  async list(): Promise<any> {
    const ordersData = await this.databaseConnection.query(
      'SELECT * FROM branas.order',
      [],
    )
    if (!ordersData.length) {
      return []
    }
    for (const orderData of ordersData) {
      orderData.items = (
        await this.databaseConnection.query(
          'SELECT * FROM branas.order_item i inner join branas.product p ON i.id_item = p.id WHERE i.id_order = ?',
          [orderData.id],
        )
      ).map((item: any) => ({
        description: item.nome,
        price: Number(item.preco),
        quantity: item.quantidade,
      }))
    }
    return ordersData
  }
}
