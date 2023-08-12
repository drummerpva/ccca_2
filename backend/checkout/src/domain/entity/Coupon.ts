// Entity
export class Coupon {
  constructor(
    readonly code: string,
    readonly percentage: number,
    readonly expirationDate: Date,
  ) {}

  isValid(currentDate?: Date): boolean {
    return (
      this.expirationDate.getTime() >= (currentDate || new Date()).getTime()
    )
  }

  calculateDiscount(value: number): number {
    return (value * this.percentage) / 100
  }
}
