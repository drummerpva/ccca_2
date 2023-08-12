import { CouponRepository } from '../repository/CouponRepository'
import { RepositoryFactory } from '../factory/RepositoryFactory'

type Input = {
  code: string
  date?: Date
}

type Output = {
  isValid: boolean
}

export class ValidateCoupon {
  private couponRepository: CouponRepository
  constructor(repositoryFactory: RepositoryFactory) {
    this.couponRepository = repositoryFactory.createCouponRepository()
  }

  async execute(input: Input): Promise<Output> {
    const output = {
      isValid: false,
    }
    const coupon = await this.couponRepository.get(input.code)
    if (!coupon) return output
    if (coupon.isValid(input.date)) output.isValid = true
    return output
  }
}
