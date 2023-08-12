import { HttpClient } from './HttpClient'

export class FetchAdapter implements HttpClient {
  async get(url: string): Promise<any> {
    const response = await fetch(url)
    return await response.json()
  }

  async post(url: string, params: any): Promise<any> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(params),
    })
    return await response.json()
  }
}
