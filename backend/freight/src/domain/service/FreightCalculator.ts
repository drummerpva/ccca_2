// Domain service
export class FreightCalculator {
  static calculate(distance: number, volume: number, density: number): number {
    let freight = volume * distance * (density / 100)
    freight = Math.max(10, freight)
    return Number(freight.toFixed(2))
  }
}
