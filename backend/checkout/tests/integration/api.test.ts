import axios from 'axios'
import { randomUUID } from 'node:crypto'
import { describe, test, expect } from 'vitest'
import { setTimeout as sleep } from 'node:timers/promises'

axios.defaults.validateStatus = () => true

describe('Api', () => {
  test('Should not create order with invalid cpf', async () => {
    const input = {
      cpf: '111.111.111-11',
    }
    const response = await axios.post('http://localhost:3000/checkout', input)
    const output = response.data
    expect(output.message).toBe('Invalid cpf')
  })
  test('Should create order with 3 items', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
    }
    const response = await axios.post('http://localhost:3000/checkout', input)
    const output = response.data
    expect(output.total).toBe(6090)
  })
  test('Should create order with 3 items with discount coupon', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
      coupon: 'VALE20',
    }
    const response = await axios.post('http://localhost:3000/checkout', input)
    const output = response.data
    expect(output.total).toBe(4872)
  })
  test('Should create order with 3 items and not apply expired coupon', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
      coupon: 'VALE20_EXPIRED',
    }
    const response = await axios.post('http://localhost:3000/checkout', input)
    const output = response.data
    expect(output.total).toBe(6090)
  })
  test('Should create order with 3 items an not apply inexistent coupon', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
      coupon: 'VALE0',
    }
    const response = await axios.post('http://localhost:3000/checkout', input)
    const output = response.data
    expect(output.total).toBe(6090)
  })
  test('Should not create order with negative quantity item', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [{ idProduct: 1, quantity: -1 }],
    }
    const response = await axios.post('http://localhost:3000/checkout', input)
    const output = response.data
    expect(response.status).toBe(422)
    expect(output.message).toBe('Invalid quantity')
  })
  test('Should not create order with duplicated items', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 1, quantity: 1 },
      ],
    }
    const response = await axios.post('http://localhost:3000/checkout', input)
    const output = response.data
    expect(output.message).toBe('Duplicated item')
  })
  test.skip('Should create order with 3 items calculing freight', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
      ],
      from: '88015600',
      to: '22030000',
    }
    const response = await axios.post('http://localhost:3000/checkout', input)
    const output = response.data
    expect(output.total).toBe(6186.42)
    expect(output.freight).toBe(186.42)
  })
  test.skip('Should create order with 3 items calculing freight with minimum price', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
      from: '89370000',
      to: '89380000',
    }
    const response = await axios.post('http://localhost:3000/checkout', input)
    const output = response.data
    expect(output.total).toBe(6140)
    expect(output.freight).toBe(50)
  })
  test('Should create order with 3 items and validate authentication', async () => {
    const idOrder = randomUUID()
    const input = {
      idOrder,
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsImlhdCI6MTY5MTE1NDAwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ.pmuJDX8gLddx3sgUlP7NcQhj7ogbzyX07tStFxzTgQE',
    }
    await axios.post('http://localhost:3000/checkout', input)
    const response = await axios.get(
      `http://localhost:3000/orders/${idOrder}`,
      { headers: { token: input.token } },
    )
    const output = response.data
    expect(output.total).toBe(6090)
  })
  test('Should create order with 3 items asyncronous', async () => {
    const idOrder = randomUUID()
    const input = {
      idOrder,
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
    }
    await axios.post('http://localhost:3000/checkoutAsync', input)
    await sleep(300)
    const { data: output } = await axios.get(
      `http://localhost:3000/orders/${idOrder}`,
    )
    expect(output.total).toBe(6090)
  })
})
