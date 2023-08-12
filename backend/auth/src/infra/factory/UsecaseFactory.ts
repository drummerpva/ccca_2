import { RepositoryFactory } from '../../application/factory/RepositoryFactory'
import { Login } from '../../application/usecase/Login'
import { Signup } from '../../application/usecase/Signup'
import { Verify } from '../../application/usecase/Verfiy'

export class UsecaseFactory {
  constructor(private repositoryFactory: RepositoryFactory) {}

  createSignup() {
    return new Signup(this.repositoryFactory)
  }

  createVerify() {
    return new Verify()
  }

  createLogin() {
    return new Login(this.repositoryFactory)
  }
}
