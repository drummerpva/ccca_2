import { User } from '../../domain/entity/User'

export interface UserRepository {
  findByEmail(email: string): Promise<User | undefined>
  save(user: User): Promise<any>
  update(user: User): Promise<any>
  clear(): Promise<void>
}
