import axios from 'axios'
import { describe, test, expect } from 'vitest'
axios.defaults.validateStatus = () => true

describe('Api', () => {
  test('Should calculate freight', async () => {
    const input = {
      items: [{ volume: 0.03, density: 100, quantity: 1 }],
      from: '88015600',
      to: '22030000',
    }
    const response = await axios.post(
      'http://localhost:3002/simulateFreight',
      input,
    )
    const output = response.data
    expect(output.freight).toBe(22.37)
  })
})
