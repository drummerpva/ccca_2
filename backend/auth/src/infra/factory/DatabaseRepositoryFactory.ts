import { DatabaseConnection } from '../database/DatabaseConnection'
import { RepositoryFactory } from '../../application/factory/RepositoryFactory'
import { UserRepository } from '../../application/repository/UserRepository'
import { DatabaseUserRepository } from '../repository/DatabaseUserRepository'

export class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(private connection: DatabaseConnection) {}
  createUserRepository(): UserRepository {
    return new DatabaseUserRepository(this.connection)
  }
}
