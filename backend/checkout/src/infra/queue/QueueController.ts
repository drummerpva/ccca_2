import { UsecaseFactory } from '../factory/UsecaseFactory'
import { Queue } from './Queue'

export class QueueController {
  constructor(queue: Queue, usecaseFactory: UsecaseFactory) {
    const checkout = usecaseFactory.createCheckout()
    // Handler
    queue.on('checkout', async (input: any) => {
      await checkout.execute(input)
    })
  }
}
