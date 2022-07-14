import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { IAccountRepository } from './account-repository.interface';
import { Account } from './entities/account.entity';
import { AccountRepository } from './account.repository';
import { CreateAccountDto, UpdateAccountDto } from './dtos';
import { Permission } from 'src/modules/authorization/permission/entities/permission.entity';

@Injectable()
export class AccountService implements IAccountRepository<Account> {
  constructor(private accountRepository: AccountRepository) {}

  async getByEmail(email: string): Promise<Account> {
    return await this.accountRepository.getByEmail(email);
  }

  async getAllPermissions(id: number): Promise<Permission[]> {
    return await this.accountRepository.getAllPermissions(id);
  }

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    createAccountDto.password = await this.passwordToHash(
      createAccountDto.password,
    );
    return await this.accountRepository.create(createAccountDto);
  }

  async update(
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    if (updateAccountDto.password) {
      updateAccountDto.password = await this.passwordToHash(
        updateAccountDto.password,
      );
    }
    return await this.accountRepository.update(id, updateAccountDto);
  }

  async delete(id: number): Promise<Account> {
    return await this.accountRepository.delete(id);
  }

  async getById(id: number): Promise<Account> {
    return await this.accountRepository.getById(id);
  }

  async getAll(): Promise<Account[]> {
    return await this.accountRepository.getAll();
  }

  async passwordToHash(password: string): Promise<string> {
    return await hash(password, await genSalt(10));
  }

  async checkPassword(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
