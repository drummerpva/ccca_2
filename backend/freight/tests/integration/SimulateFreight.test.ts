import { describe, test, expect, beforeEach } from 'vitest'
import { SimulateFreight } from '../../src/application/usecase/SimulateFreight'
import { RemoteGatewayFactory } from '../../src/infra/gateway/RemoteGatewayFactory'
import { AxiosAdapter } from '../../src/infra/http/AxiosAdapter'

describe('SimulateFreight', () => {
  let sut: SimulateFreight
  beforeEach(() => {
    const httpClient = new AxiosAdapter()
    const gatewayFactory = new RemoteGatewayFactory(httpClient)
    sut = new SimulateFreight(gatewayFactory)
  })

  test('Should simulate freight without calc', async () => {
    const input = {
      items: [{ volume: 0.03, density: 100, quantity: 1 }],
      from: '00000000',
      to: '00000000',
    }
    const output = await sut.execute(input)
    expect(output.freight).toBe(30)
  })
  test('Should simulate freight with distance calc', async () => {
    const input = {
      items: [{ volume: 0.03, density: 100, quantity: 1 }],
      from: '88015600',
      to: '22030000',
    }
    const output = await sut.execute(input)
    expect(output.freight).toBe(22.37)
  })
})
