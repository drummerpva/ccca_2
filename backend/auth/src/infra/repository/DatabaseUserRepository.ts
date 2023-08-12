import { UserRepository } from '../../application/repository/UserRepository'
import { User } from '../../domain/entity/User'
import { DatabaseConnection } from '../database/DatabaseConnection'

export class DatabaseUserRepository implements UserRepository {
  constructor(private connection: DatabaseConnection) {}
  async save(user: User): Promise<any> {
    await this.connection.query(
      'INSERT INTO branas.user(email, password, salt) VALUES(?,?,?)',
      [user.email.value, user.password.value, user.password.salt],
    )
  }

  async update(user: User): Promise<any> {
    await this.connection.query(
      'UPDATE branas.user SET password = ?, salt = ? WHERE email = ?',
      [user.email.value, user.password.value, user.password.salt],
    )
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const [userData] = await this.connection.query(
      'SELECT * FROM branas.user WHERE email =?',
      [email],
    )
    if (!userData) return
    return User.restore(userData.email, userData.password, userData.salt)
  }

  async clear(): Promise<void> {
    await this.connection.query('DELETE FROM branas.user')
  }
}
