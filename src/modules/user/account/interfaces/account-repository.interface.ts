import { CreateAccountDto, UpdateAccountDto } from '../dtos';

export interface IAccountRepository<T> {
  create(createAccountDto: CreateAccountDto): Promise<T>;
  update(id: number, updateAccountDto: UpdateAccountDto): Promise<T>;
  delete(id: number): Promise<T>;
  getById(id: number): Promise<T>;
  getAll(): Promise<T[]>;
}
