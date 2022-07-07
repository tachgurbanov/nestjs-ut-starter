import { IAccountRepository } from './account-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { UpdateAccountDto } from '../dtos/update-account.dto';

@Injectable()
export class AccountRepository implements IAccountRepository<Account> {
  constructor(
    @Inject('ACCOUNT_REPOSITORY')
    private accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    return await this.accountRepository.save(
      this.accountRepository.create(createAccountDto),
    );
  }

  async update(
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    return (await this.accountRepository.update(id, updateAccountDto)).raw[0];
  }

  async delete(id: number): Promise<Account> {
    return (await this.accountRepository.delete(id)).raw[0];
  }

  async getById(id: number): Promise<Account> {
    return await this.accountRepository
      .createQueryBuilder()
      .where('user.id = :id', { id: id })
      .getOne();
  }

  async getAll(): Promise<Account[]> {
    return await this.accountRepository.find();
  }
}
