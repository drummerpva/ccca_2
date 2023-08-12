// Entity
export class Product {
  constructor(
    public idProduct: number,
    public description: string,
    public price: number,
    public width: number,
    public height: number,
    public length: number,
    public weight: number,
    public volume: number,
    public density: number,
  ) {}
}
