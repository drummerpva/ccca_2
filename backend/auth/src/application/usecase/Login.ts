import { RepositoryFactory } from '../factory/RepositoryFactory'
import { UserRepository } from '../repository/UserRepository'
import { TokenGenerator } from '../../domain/service/TokenGenerator'

type Input = {
  email: string
  password: string
  date: Date
}
type Output = {
  token: string
}
export class Login {
  userRepository: UserRepository
  constructor(repositoryFactory: RepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository()
  }

  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.findByEmail(input.email)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    if (!user.validatePassword(input.password)) {
      throw new Error('Invalid credentials')
    }
    const tokenGenerator = new TokenGenerator('secret')
    return {
      token: tokenGenerator.sign(user, input.date),
    }
  }
}
