import { OrderDAO } from '../dao/OrderDAO'
import { Usecase } from '../usecase/Usecase'

type Item = {
  description: string
  price: number
  quantity: number
}

type Output = {
  idOrder: string
  items: Item[]
  date: Date
}
export class GetOrders implements Usecase {
  constructor(private orderDAO: OrderDAO) {}

  async execute(): Promise<Output[]> {
    const ordersData = await this.orderDAO.list()
    return ordersData
  }
}
