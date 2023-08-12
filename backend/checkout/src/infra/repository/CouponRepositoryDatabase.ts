import { CouponRepository } from '../../application/repository/CouponRepository'
import { Coupon } from '../../domain/entity/Coupon'
import { DatabaseConnection } from '../database/DatabaseConnection'

export class CouponRepositoryDatabase implements CouponRepository {
  constructor(private databaseConnection: DatabaseConnection) {}

  async get(coupon: string): Promise<Coupon | undefined> {
    const [couponData] = await this.databaseConnection.query(
      'select * from branas.coupon where codigo = ?',
      [coupon],
    )
    if (!couponData) return undefined
    return new Coupon(
      couponData.codigo,
      couponData.porcentagem,
      new Date(couponData.data_expiracao),
    )
  }
}
