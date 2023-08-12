import { DatabaseConnection } from './DatabaseConnection'
import mysql from 'mysql2/promise'

// Framework and Driver
// Adapter
export class MysqlDatabaseConnection implements DatabaseConnection {
  connection: any
  async connect(): Promise<void> {
    this.connection = await mysql.createConnection(
      'mysql://root:root@localhost:3306/branas',
    )
  }

  async query(statement: string, params: any = []): Promise<any> {
    const [rows] = await this.connection.query(statement, params)
    return rows
  }

  async close(): Promise<void> {
    await this.connection.end()
  }
}
