import { useState } from 'react'
import { Product } from './entity/Product'
import { Order } from './entity/Order'

export const useOrder = () => {
  const [order, setOrder] = useState(
    new Order('doasijdioajsoiajsdiojasoijasdjos', '987.654.321-00'),
  )

  return {
    order,
    addItem: (product: Product) => {
      order.addItem(product)
      setOrder(Object.create(order))
    },
    getTotal: () => order.getTotal(),
  }
}
