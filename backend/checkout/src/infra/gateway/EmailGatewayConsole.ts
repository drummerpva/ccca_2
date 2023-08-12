import { EmailGateway } from '../../application/gateway/EmailGateway'

export class EmailGatewayConsole implements EmailGateway {
  async send(emailInput: {
    subject: string
    content: string
    to: string[]
    from: string
  }): Promise<void> {
    console.log(`Email sent to ${emailInput.to}`)
  }
}
