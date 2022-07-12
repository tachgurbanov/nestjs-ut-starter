import { IAccountRepository } from './account-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dtos';
import { UpdateAccountDto } from './dtos';
import { Permission } from 'src/modules/authorization/permission/entities/permission.entity';

@Injectable()
export class AccountRepository implements IAccountRepository<Account> {
  constructor(
    @Inject('ACCOUNT_REPOSITORY')
    private accountRepository: Repository<Account>,
  ) {}

  async getAllPermissions(id: number): Promise<Permission[]> {
    const permissions = [];
    const user = await this.accountRepository.findOne({ where: { id: id } });
    for (const role of user.roles) {
      permissions.push(role.permissions);
    }
    return permissions;
  }

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
      .where('account.id = :id', { id: id })
      .getOne();
  }

  async getAll(): Promise<Account[]> {
    return await this.accountRepository.find();
  }
}
