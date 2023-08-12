import { sign, verify } from 'jsonwebtoken'
import { User } from '../entity/User'

// Domain service

export class TokenGenerator {
  expiresIn = 1000000
  constructor(readonly secret: string) {}

  sign(user: User, date: Date): string {
    const token = sign(
      {
        email: user.email.value,
        iat: date.getTime(),
        expiresIn: this.expiresIn,
      },
      this.secret,
    )
    return token
  }

  verify(token: string): any {
    try {
      return verify(token, this.secret)
    } catch (error) {
      return undefined
    }
  }
}
