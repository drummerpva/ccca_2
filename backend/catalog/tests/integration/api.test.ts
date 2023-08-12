import axios from 'axios'
import { describe, test, expect } from 'vitest'
axios.defaults.validateStatus = () => true

describe('Api', () => {
  test('Should list the products em json', async () => {
    const response = await axios.get('http://localhost:3001/products', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const output = response.data
    expect(output).toHaveLength(3)
    expect(output.at(0)?.idProduct).toBe(1)
  })
  test('Should list the products em csv', async () => {
    const response = await axios.get('http://localhost:3001/products', {
      headers: {
        'Content-Type': 'text/csv',
      },
    })
    const output = response.data
    expect(output).toBe('1;Guitarra;1000\n2;Amplificador;5000\n3;Cabo;30')
  })
  test('Should get a Product', async () => {
    const response = await axios.get('http://localhost:3001/products/1')
    const output = response.data
    expect(output.idProduct).toBe(1)
    expect(output.description).toBe('Guitarra')
    expect(output.price).toBe(1000)
    expect(output.width).toBe(100)
    expect(output.height).toBe(30)
    expect(output.length).toBe(10)
    expect(output.weight).toBe(3)
    expect(output.volume).toBe(0.03)
    expect(output.density).toBe(100)
  })
})
