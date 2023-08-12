import { Email } from '../ValueObject/Email'
import { Password } from '../ValueObject/Password'

export class User {
  private constructor(
    public email: Email,
    public password: Password,
  ) {}

  // Static factory method
  static create(email: string, password: string) {
    return new User(new Email(email), Password.create(password))
  }

  // Static factory method
  static restore(email: string, hash: string, salt: string) {
    return new User(new Email(email), Password.restore(hash, salt))
  }

  updatePassword(password: string) {
    this.password = Password.create(password)
  }

  validatePassword(password: string): boolean {
    return this.password.validate(password)
  }
}
