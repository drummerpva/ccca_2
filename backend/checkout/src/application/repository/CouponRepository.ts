import { Coupon } from '../../domain/entity/Coupon'

export interface CouponRepository {
  get: (coupon: string) => Promise<Coupon | undefined>
}
