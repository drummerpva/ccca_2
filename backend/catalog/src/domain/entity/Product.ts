export class Product {
  constructor(
    public idProduct: number,
    public description: string,
    public price: number,
    public width: number,
    public height: number,
    public length: number,
    public weight: number,
  ) {
    if (width <= 0 || height <= 0 || length <= 0)
      throw new Error('Invalid dimension')
    if (weight <= 0) throw new Error('Invalid weight')
  }

  getVolume(): number {
    return (this.width / 100) * (this.height / 100) * (this.length / 100)
  }

  getDensity(): number {
    return this.weight / this.getVolume()
  }
}
