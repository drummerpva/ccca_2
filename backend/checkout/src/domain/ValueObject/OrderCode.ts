// Value Object
export class OrderCode {
  private value: string
  constructor(date: Date, sequence: number) {
    this.value = `${date.getFullYear()}${String(sequence).padStart(8, '0')}`
  }

  getCode(): string {
    return this.value
  }
}
