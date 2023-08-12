import { Zipcode } from '../../domain/entity/Zipcode'

export interface ZipcodeGateway {
  getCoordinateFromZipcode(zipcode: string): Promise<Zipcode | undefined>
}
