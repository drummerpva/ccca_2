import { Coord } from '../ValueObject/Coord'
// Entity - Aggregate Root
export class Zipcode {
  coord: Coord

  constructor(
    readonly code: string,
    private lat: number,
    private long: number,
  ) {
    this.coord = new Coord(lat, long)
  }
}
