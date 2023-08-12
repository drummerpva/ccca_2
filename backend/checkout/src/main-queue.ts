/* import mysql from 'mysql2/promise'
import { connect } from 'amqplib'
import { validate } from './validateCpf'
import { Checkout } from './application/usecase/Checkout'
;(async () => {
  const connection = await connect('amqp://localhost')
  const channel = await connection.createChannel()
  channel.assertQueue('checkout', { durable: true })
  channel.consume('checkout', async (message: any) => {
    const input = JSON.parse(message?.content.toString())
    const checkout = new Checkout()
    try {
      const output = await checkout.execute(input)
      console.log(output)
    } catch (error: any) {
      console.log(error.message)
    }
    channel.ack(message)
  })
})()
 */
