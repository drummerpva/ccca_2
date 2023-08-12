export interface HttpServer {
  on(
    method: string,
    url: string,
    callback: (params: any, body: any) => Promise<any>,
  ): void
  listen(port: number): void
}
