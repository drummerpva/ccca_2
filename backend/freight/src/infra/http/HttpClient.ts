export interface HttpClient {
  get(url: string): Promise<any>
  post(url: string, params: any): Promise<any>
}
