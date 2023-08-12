export interface EmailGateway {
  send(emailInput: {
    subject: string
    content: string
    to: string[]
    from: string
  }): Promise<void>
}
