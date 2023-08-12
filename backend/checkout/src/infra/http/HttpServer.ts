export interface HttpServer {
  on(
    method: string,
    url: string,
    callback: (params: any, body: any, headers?: any) => Promise<any>,
  ): void
  listen(port: number): void
}
