import { DistanceCalculator } from '../../domain/service/DistanceCalculator'
import { FreightCalculator } from '../../domain/service/FreightCalculator'
import { GatewayFactory } from '../gateway/GatewayFactory'
import { ZipcodeGateway } from '../gateway/ZipcodeGateway'

type Item = {
  volume: number
  density: number
  quantity: number
}
type Input = {
  items: Item[]
  from?: string
  to?: string
}
type Output = {
  freight: number
}

// Use case / Application Service
export class SimulateFreight {
  zipcodeGateway: ZipcodeGateway
  constructor(gatewayFactory: GatewayFactory) {
    this.zipcodeGateway = gatewayFactory.createZipcodeGateway()
  }

  async execute(input: Input): Promise<Output> {
    const output = {
      freight: 0,
    }
    for (const item of input.items) {
      if (input.from && input.to) {
        const from = await this.zipcodeGateway.getCoordinateFromZipcode(
          input.from,
        )
        const to = await this.zipcodeGateway.getCoordinateFromZipcode(input.to)
        let distance = 1000
        if (from && to) {
          distance = DistanceCalculator.calculate(from.coord, to.coord)
        }
        const freight = FreightCalculator.calculate(
          distance,
          item.volume,
          item.density,
        )
        output.freight += freight * item.quantity
      }
    }
    return {
      freight: Number(output.freight.toFixed(3)),
    }
  }
}
