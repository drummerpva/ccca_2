import { HttpServer } from './HttpServer'
import express, { Request, Response } from 'express'

// Framework and Driver
export class ExpressAdapter implements HttpServer {
  app: any
  constructor() {
    this.app = express()
    this.app.use(express.json())
  }

  on(
    method: string,
    url: string,
    callback: (params: any, body: any) => Promise<any>,
  ): void {
    this.app[method](url, async (req: Request, res: Response) => {
      try {
        const output = await callback(req.params, req.body)
        res.json(output)
      } catch (error: any) {
        res.status(422).json({ message: error.message })
      }
    })
  }

  listen(port: number): void {
    this.app.listen(port, () => console.log('Server is running'))
  }
}
