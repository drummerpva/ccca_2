import { Order } from '../../domain/entity/Order'
import { OrderRepository } from '../../application/repository/OrderRepository'
import { DatabaseConnection } from '../database/DatabaseConnection'
import { Item } from '../../domain/ValueObject/Item'

export class OrderRepositoryDatabase implements OrderRepository {
  constructor(private databaseConnection: DatabaseConnection) {}
  async list(): Promise<Order[]> {
    const ordersData = await this.databaseConnection.query(
      'SELECT * FROM branas.order',
      [],
    )
    if (!ordersData.length) {
      return []
    }
    const orders: Order[] = []
    for (const orderData of ordersData) {
      const itemsData = await this.databaseConnection.query(
        'SELECT * FROM branas.order_item WHERE id_order = ?',
        [orderData.id],
      )
      const order = new Order(
        orderData.id,
        orderData.cpf,
        new Date(orderData.date),
        orderData.sequencia,
      )
      const items = itemsData.map(
        (itemData: any) =>
          new Item(
            itemData.id_item,
            Number(itemData.preco),
            itemData.quantidade,
          ),
      )
      order.items = items
      orders.push(order)
    }
    return orders
  }

  async clean(): Promise<void> {
    await this.databaseConnection.query('DELETE FROM branas.order_item', [])
    await this.databaseConnection.query('DELETE FROM branas.order', [])
  }

  async count(): Promise<number> {
    const [row] = await this.databaseConnection.query(
      'SELECT COUNT(1) as count FROM branas.order',
      [],
    )
    return row.count
  }

  async getById(idOrder: string): Promise<Order | undefined> {
    const [orderData] = await this.databaseConnection.query(
      'select * from branas.order where id = ?',
      [idOrder],
    )
    if (!orderData) {
      return
    }
    const order = new Order(
      orderData.id,
      orderData.cpf,
      new Date(orderData.date),
      orderData.sequencia,
    )
    order.freight = Number(orderData.frete ?? 0)
    /*  if (orderData.coupon_code) {
      order.coupon = new Coupon(
        orderData.coupon_code,
        orderData.coupon_percentage,
      )
    } */
    const itemsData = await this.databaseConnection.query(
      'SELECT * FROM branas.order_item WHERE id_order = ?',
      [idOrder],
    )

    orderData.items = []
    for (const item of itemsData) {
      order.items.push(
        new Item(item.id_item, Number(item.preco), item.quantidade),
      )
    }
    return order
  }

  async save(order: Order): Promise<void> {
    await this.databaseConnection.query(
      'INSERT INTO branas.order(id, codigo, cpf, total, frete, date, sequencia) VALUES(?, ?, ?, ?, ?,?,?)',
      [
        order.id,
        order.code,
        order.cpf.value,
        order.getTotal(),
        order.freight,
        order.date,
        order.sequence,
      ],
    )
    for (const item of order.items) {
      const [product] = await this.databaseConnection.query(
        'SELECT * FROM product WHERE id = ?',
        [item.idProduct],
      )
      await this.databaseConnection.query(
        'INSERT INTO branas.order_item(id_order,  id_item, preco, quantidade) VALUES(?, ?, ?, ?)',
        [order.id, item.idProduct, product.valor, item.quantity],
      )
    }
  }
}
