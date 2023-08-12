import { describe, test, expect } from 'vitest'
import axios from 'axios'
axios.defaults.validateStatus = () => true

describe('Api', () => {
  test('should verify a token', async () => {
    const input = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsImlhdCI6MTY5MTE1NDAwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ.pmuJDX8gLddx3sgUlP7NcQhj7ogbzyX07tStFxzTgQE',
    }
    const response = await axios.post('http://localhost:3004/verify', input)
    const output = response.data
    expect(output.email).toBe('teste@teste.com')
  })
})
