/* import { describe, expect, test } from 'vitest'
import { connect } from 'amqplib'

// describe('Queue', () => {
//   test('Should checkout using queue', async () => {
//     const connection = await connect('amqp://localhost')
//   })
// })
;(async () => {
  const connection = await connect('amqp://localhost')
  const channel = await connection.createChannel()
  channel.assertQueue('checkout', { durable: true })
  const input = {
    cpf: '987.654.321-00',
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
  }
  channel.sendToQueue('checkout', Buffer.from(JSON.stringify(input)))
})()
 */