import '@testing-library/jest-dom'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import { App } from '../src/App'
import { CheckoutGateway } from '../src/gateway/CheckoutGateway'

describe('App', () => {
  test('Should test all', async () => {
    const checkoutGateway: CheckoutGateway = {
      async checkout() {
        return {
          total: 6090,
        }
      },
      async getProducts() {
        return [
          {
            idProduct: 1,
            description: 'Guitarra',
            price: 1000,
          },
          {
            idProduct: 2,
            description: 'Amplificador',
            price: 5000,
          },
          {
            idProduct: 3,
            description: 'Cabo',
            price: 30,
          },
        ]
      },
    }
    const { container } = render(<App checkoutGateway={checkoutGateway} />)
    expect(container.querySelector('.module-name')?.textContent).toBe(
      'Checkout',
    )
    await waitFor(async () => screen.getByText('Items'))
    expect(
      container.querySelectorAll('.product-description')[0]?.textContent,
    ).toBe('Guitarra')
    expect(container.querySelectorAll('.product-price')[0]?.textContent).toBe(
      '1000',
    )
    expect(
      container.querySelectorAll('.product-description')[1]?.textContent,
    ).toBe('Amplificador')
    expect(container.querySelectorAll('.product-price')[1]?.textContent).toBe(
      '5000',
    )
    expect(
      container.querySelectorAll('.product-description')[2]?.textContent,
    ).toBe('Cabo')
    expect(container.querySelectorAll('.product-price')[2]?.textContent).toBe(
      '30',
    )

    const button0 = container.querySelectorAll('.product-add-button')[0]
    const button1 = container.querySelectorAll('.product-add-button')[1]
    const button2 = container.querySelectorAll('.product-add-button')[2]
    fireEvent.click(button0)
    fireEvent.click(button1)
    fireEvent.click(button2)
    fireEvent.click(button2)
    fireEvent.click(button2)
    expect(container.querySelector('.total')?.textContent).toBe('6090')
    expect(container.querySelectorAll('.order-item')[0]?.textContent).toBe(
      '1 1',
    )
    expect(container.querySelectorAll('.order-item')[1]?.textContent).toBe(
      '2 1',
    )
    expect(container.querySelectorAll('.order-item')[2]?.textContent).toBe(
      '3 3',
    )

    const checkoutButton = container.querySelectorAll('.checkout-button')[0]
    fireEvent.click(checkoutButton)
    expect(container.querySelectorAll('.order-item')[2]?.textContent).toBe(
      '3 3',
    )
    await waitFor(async () => screen.getByTestId('success'))
    expect(container.querySelectorAll('.success-value')[0]?.textContent).toBe(
      '6090',
    )
  })
})
