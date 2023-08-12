import { TokenGenerator } from '../../domain/service/TokenGenerator'

type Output = {
  email: string
}
export class Verify {
  async execute(token: string): Promise<Output> {
    const tokenGenerator = new TokenGenerator('secret')
    const output = tokenGenerator.verify(token)
    return {
      email: output.email,
    }
  }
}
