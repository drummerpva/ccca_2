import { Order } from '../../domain/entity/Order'

export interface OrderRepository {
  getById(idOrder: string): Promise<Order | undefined>
  list(): Promise<Order[]>
  save(order: Order): Promise<void>
  clean(): Promise<void>
  count(): Promise<number>
}
