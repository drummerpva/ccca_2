import { pbkdf2Sync, randomBytes } from 'crypto'

export class Password {
  private constructor(
    readonly value: string,
    readonly salt: string,
  ) {}

  // Static factory method
  static create(password: string) {
    const salt = randomBytes(20).toString('hex')
    const hash = pbkdf2Sync(password, salt, 64, 100, 'sha512').toString('hex')
    return new Password(hash, salt)
  }

  // Static factory method
  static restore(hash: string, salt: string) {
    return new Password(hash, salt)
  }

  validate(password: string): boolean {
    const hash = pbkdf2Sync(password, this.salt, 64, 100, 'sha512').toString(
      'hex',
    )
    return hash === this.value
  }
}
