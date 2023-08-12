import { DatabaseConnection } from '../database/DatabaseConnection'
import { RepositoryFactory } from '../../application/factory/RepositoryFactory'

export class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(private connection: DatabaseConnection) {}
}
