/* eslint-disable @typescript-eslint/no-non-null-assertion */
import sinon from 'sinon'
import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import { Checkout } from '../../src/application/usecase/Checkout'
import { EmailGateway } from '../../src/application/gateway/EmailGateway'
import { randomUUID } from 'node:crypto'
import { GetOrder } from '../../src/application/usecase/GetOrder'
import { Product } from '../../src/domain/entity/Product'
import { DatabaseRepositoryFactory } from '../../src/infra/factory/DatabaseRepositoryFactory'
import { DatabaseConnection } from '../../src/infra/database/DatabaseConnection'
import { RepositoryFactory } from '../../src/application/factory/RepositoryFactory'
import { MysqlDatabaseConnection } from '../../src/infra/database/MysqlDatabaseConnection'
import { HttpGatewayFactory } from '../../src/infra/factory/HttpGatewayFactory'
import { AxiosAdapter } from '../../src/infra/http/AxiosAdapter'
import { GatewayFactory } from '../../src/application/gateway/GatewayFactory'
import { HttpCatalogGateway } from '../../src/infra/gateway/HttpCatalogGateway'

type SutTypes = {
  sut: Checkout
  emailGateway: EmailGateway
  repositoryFactory: RepositoryFactory
  connection: DatabaseConnection
  getOrder: any
  gatewayFactory: GatewayFactory
}
const makeSut = async (): Promise<SutTypes> => {
  const connection = new MysqlDatabaseConnection()
  await connection.connect()
  const repositoryFactory = new DatabaseRepositoryFactory(connection)
  const httpClient = new AxiosAdapter()
  const gatewayFactory = new HttpGatewayFactory(httpClient)
  const getOrder = new GetOrder(repositoryFactory, gatewayFactory)
  const emailGateway = gatewayFactory.createEmailGateway()
  const sut = new Checkout(repositoryFactory, gatewayFactory)
  return {
    sut,
    emailGateway,
    getOrder,
    repositoryFactory,
    connection,
    gatewayFactory,
  }
}

describe('Checkout', () => {
  beforeAll(async () => {
    const { connection } = await makeSut()
    await connection.connect()
  })
  afterAll(async () => {
    const { connection } = await makeSut()
    if (connection) await connection.close()
  })
  test('Should not create order with invalid cpf', async () => {
    const input = {
      cpf: '111.111.111-11',
    }
    const { sut: checkout } = await makeSut()
    expect(() => checkout.execute(input)).rejects.toThrow(
      new Error('Invalid cpf'),
    )
  })
  test('Should create order with 3 items', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
      email: 'JohnDoe@gmail.com',
    }
    const { sut: checkout } = await makeSut()
    const output = await checkout.execute(input)

    expect(output.total).toBe(6090)
  })
  test('Should create order with 3 items with discount coupon', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
      coupon: 'VALE20',
    }
    const { sut: checkout } = await makeSut()
    const output = await checkout.execute(input)

    expect(output.total).toBe(4872)
  })
  test('Should create order with 3 items and not apply expired coupon', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
      coupon: 'VALE20_EXPIRED',
    }
    const { sut: checkout } = await makeSut()
    const output = await checkout.execute(input)

    expect(output.total).toBe(6090)
  })
  test('Should create order with 3 items an not apply inexistent coupon', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
      coupon: 'VALE0',
    }
    const { sut: checkout } = await makeSut()
    const output = await checkout.execute(input)

    expect(output.total).toBe(6090)
  })
  test('Should not create order with negative quantity item', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [{ idProduct: 1, quantity: -1 }],
    }
    const { sut: checkout } = await makeSut()
    expect(() => checkout.execute(input)).rejects.toThrow('Invalid quantity')
  })
  test('Should not create order with duplicated items', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 1, quantity: 1 },
      ],
    }
    const { sut: checkout } = await makeSut()
    expect(() => checkout.execute(input)).rejects.toThrow('Duplicated item')
  })
  test.skip('Should create order with 3 items calculing freight', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
      ],
      from: '88015600',
      to: '22030000',
    }
    const { sut: checkout } = await makeSut()
    const output = await checkout.execute(input)

    expect(output.total).toBe(6186.42)
    expect(output.freight).toBe(186.42)
  })
  test.skip('Should create order with 3 items calculing freight with minimum price', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
      from: '89370000',
      to: '89380000',
    }
    const { sut: checkout } = await makeSut()
    const output = await checkout.execute(input)

    expect(output.total).toBe(6140)
    expect(output.freight).toBe(50)
  })
  test.skip('Should not create order with product have not register in database', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [{ idProduct: 6, quantity: 1 }],
    }
    const { sut: checkout } = await makeSut()
    expect(() => checkout.execute(input)).rejects.toThrow('Product not found')
  })
  test('Should create order with 1 item STUB', async () => {
    const productRepositoryStub = sinon
      .stub(HttpCatalogGateway.prototype, 'getProduct')
      .resolves(new Product(1, 'A', 100, 1, 1, 1, 1, 0.03, 100))
    const { repositoryFactory, gatewayFactory } = await makeSut()
    const checkout = new Checkout(repositoryFactory, gatewayFactory)
    const input = {
      id: randomUUID(),
      cpf: '987.654.321-00',
      items: [{ idProduct: 1, quantity: 1 }],
    }

    const output = await checkout.execute(input)

    expect(output.total).toBe(100)

    productRepositoryStub.restore()
  })
  test.skip('Should verify if the email has been sent SPY', async () => {
    const { sut: checkout, gatewayFactory } = await makeSut()
    const emailGatewaySpy = sinon.spy(
      gatewayFactory.createEmailGateway(),
      'send',
    )
    const input = {
      cpf: '987.654.321-00',
      items: [{ idProduct: 1, quantity: 1 }],
      email: 'john.doe@gmail.com',
    }
    await checkout.execute(input)
    expect(emailGatewaySpy.calledOnce).toBe(true)
    expect(emailGatewaySpy.calledWithMatch({ to: [input.email] })).toBe(true)
    emailGatewaySpy.restore()
  })
  test('Should get data from repository MOCK', async () => {
    const { repositoryFactory, gatewayFactory } = await makeSut()
    const checkout = new Checkout(repositoryFactory, gatewayFactory)
    const catalogGatewayMock = sinon.mock(HttpCatalogGateway.prototype)
    catalogGatewayMock.expects('getProduct').once().resolves({
      idProduct: 1,
      description: 'A',
      price: 100,
    })
    const input = {
      id: randomUUID(),
      cpf: '987.654.321-00',
      items: [{ idProduct: 1, quantity: 1 }],
    }

    await checkout.execute(input)

    catalogGatewayMock.verify() // verifica parametros passados na chamada, once() calleWith() ...
  })
  test('Should create order with 3 items and get saved order', async () => {
    const idOrder = randomUUID()
    const inputCreate = {
      idOrder,
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
    }
    const { sut: checkout, getOrder } = await makeSut()
    await checkout.execute(inputCreate)
    const order = await getOrder.execute({ idOrder })
    expect(order.total).toBe(6090)
    expect(order.items.length).toBe(3)
    expect(order.cpf).toBe(inputCreate.cpf)
  })
  test('Should create order with 3 items and generate order code', async () => {
    const { sut: checkout, getOrder, repositoryFactory } = await makeSut()
    const orderRepository = repositoryFactory.createOrderRepository()
    await orderRepository.clean()
    const idOrder = randomUUID()
    const inputCreate = {
      idOrder: randomUUID(),
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
      date: new Date('2022-01-01T10:00:00'),
    }
    await checkout.execute(inputCreate)
    await checkout.execute({ ...inputCreate, idOrder })
    const order = await getOrder.execute({ idOrder })
    expect(order.code).toBe('202200000002')
  })
})
