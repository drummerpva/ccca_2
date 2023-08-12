import { useEffect, useState } from 'react'

import './App.css'
import { CheckoutGateway } from './gateway/CheckoutGateway'
import { Product } from './entity/Product'
import { useOrder } from './useOrder'
type AppProps = {
  checkoutGateway: CheckoutGateway
}
export function App({ checkoutGateway }: AppProps) {
  const [products, setProducts] = useState<Product[]>([])
  const { order, addItem, getTotal } = useOrder()
  const [success, setSuccess] = useState('')
  useEffect(() => {
    const onLoad = async () => {
      try {
        const products = await checkoutGateway.getProducts()
        setProducts(products)
      } catch (error: any) {
        console.log(error.message)
      }
    }
    onLoad()
    // window.addEventListener('load', onLoad)
    // return () => window.removeEventListener('load', onLoad)
  }, [checkoutGateway])
  const handleCheckout = async () => {
    try {
      const checkout = await checkoutGateway.checkout(order)
      setSuccess(checkout.total)
    } catch (error: any) {
      console.log(error.message)
    }
  }
  return (
    <div>
      <h1>Clean Code e Clear Architecture</h1>
      <h2 className="module-name">Checkout</h2>
      {!!products.length && <h3>Items</h3>}
      {products.map((product) => (
        <div key={product.description} style={{ display: 'flex' }}>
          <p className="product-description">{product.description}</p>
          <p className="product-price">{product.price}</p>
          <button
            className="product-add-button"
            onClick={() => addItem(product)}
          >
            Add
          </button>
        </div>
      ))}
      <div className="total">{getTotal()}</div>
      {order.items?.map((item: any, index: number) => (
        <div
          key={index}
          className="order-item"
        >{`${item.idProduct} ${item.quantity}`}</div>
      ))}
      <button className="checkout-button" onClick={handleCheckout}>
        Checkout
      </button>
      {!!success && (
        <div data-testid="success" className="success-value">
          {success}
        </div>
      )}
    </div>
  )
}
