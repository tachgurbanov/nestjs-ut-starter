import { Injectable } from '@nestjs/common';
import { IAccountRepository } from './database/account-repository.interface';
import { Account } from './database/account.entity';
import { AccountRepository } from './database/account.repository';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';
import { passwordToHash } from './helpers/password-helper';

@Injectable()
export class AccountService implements IAccountRepository<Account> {
  constructor(private accountRepository: AccountRepository) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    createAccountDto.password = await passwordToHash(createAccountDto.password);
    return await this.accountRepository.create(createAccountDto);
  }

  async update(
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    if (updateAccountDto.password) {
      updateAccountDto.password = await passwordToHash(
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
}
