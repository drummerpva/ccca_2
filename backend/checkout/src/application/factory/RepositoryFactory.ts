import { CouponRepository } from '../repository/CouponRepository'
import { OrderRepository } from '../repository/OrderRepository'

export interface RepositoryFactory {
  createOrderRepository(): OrderRepository
  createCouponRepository(): CouponRepository
}
