export class Email {
  readonly value: string
  constructor(email: string) {
    if (!this.isValid(email)) throw new Error('Invalid email')
    this.value = email
  }

  private isValid(email: string): boolean {
    const regex =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    return regex.test(email)
  }
}
