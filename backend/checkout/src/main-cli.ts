/* import { Checkout } from './application/usecase/Checkout'

type Item = {
  idProduct: number
  quantity: number
}
type Input = {
  cpf: string
  items: Item[]
  from?: string
  to?: string
  coupon?: string
}
const input: Input = {
  cpf: '',
  items: [],
}
process.stdin.on('data', async (data) => {
  const command = data.toString().replace(/\n/g, '')
  if (command.startsWith('set-cpf')) {
    input.cpf = command.split(' ')[1]
    console.log(input)
    return
  }
  if (command.startsWith('add-item')) {
    const [idProduct, quantity] = command.replace('add-item ', '').split(' ')
    input.items.push({
      idProduct: Number(idProduct),
      quantity: Number(quantity),
    })
    console.log(input)
    return
  }
  if (command.startsWith('checkout')) {
    console.log('checkout')
    const checkout = new Checkout()
    try {
      const output = await checkout.execute(input)
      console.log(output)
    } catch (error: any) {
      console.log(error.message)
    }

    return
  }
  if (command.startsWith('quit')) {
    console.log('quit')
    process.exit()
  }
  console.error('Invalid command')
  process.exit(1)
})
 */
