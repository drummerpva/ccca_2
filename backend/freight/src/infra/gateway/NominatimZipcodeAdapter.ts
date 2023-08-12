import { ZipcodeGateway } from '../../application/gateway/ZipcodeGateway'
import { Zipcode } from '../../domain/entity/Zipcode'
import { HttpClient } from '../http/HttpClient'

export class NominatimZipcodeAdapter implements ZipcodeGateway {
  constructor(private httpClient: HttpClient) {}

  async getCoordinateFromZipcode(
    zipcode: string,
  ): Promise<Zipcode | undefined> {
    const zipcodeClean = zipcode.replace(/\D/g, '')
    const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&country=Brazil&postalcode=${zipcodeClean}&limit=1`
    const searchData = await this.httpClient.get(url)
    if (!searchData?.length) {
      return
    }
    const [localizedData] = searchData
    const lat = Number(localizedData.lat)
    const lon = Number(localizedData.lon)
    return new Zipcode(zipcode, Number(lat.toFixed(4)), Number(lon.toFixed(4)))
  }
}
