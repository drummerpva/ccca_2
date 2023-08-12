type Item = {
  volume: number
  density: number
  quantity: number
}
export type Input = {
  items: Item[]
  from?: string
  to?: string
}
export type Output = {
  freight: number
}
export interface FreightGateway {
  simulateFreight(input: Input): Promise<Output>
}
