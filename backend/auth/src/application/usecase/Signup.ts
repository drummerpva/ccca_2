import { User } from '../../domain/entity/User'
import { RepositoryFactory } from '../factory/RepositoryFactory'
import { UserRepository } from '../repository/UserRepository'
type Input = {
  email: string
  password: string
}
export class Signup {
  userRepository: UserRepository
  constructor(repositoryFactory: RepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository()
  }

  async execute(input: Input): Promise<void> {
    const user = User.create(input.email, input.password)
    await this.userRepository.save(user)
  }
}
