import { CouponRepository } from '../../application/repository/CouponRepository'
import { CouponRepositoryDatabase } from '../repository/CouponRepositoryDatabase'
import { DatabaseConnection } from '../database/DatabaseConnection'
import { OrderRepository } from '../../application/repository/OrderRepository'
import { OrderRepositoryDatabase } from '../repository/OrderRepositoryDatabase'
import { RepositoryFactory } from '../../application/factory/RepositoryFactory'

export class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(private connection: DatabaseConnection) {}

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryDatabase(this.connection)
  }

  createCouponRepository(): CouponRepository {
    return new CouponRepositoryDatabase(this.connection)
  }
}
