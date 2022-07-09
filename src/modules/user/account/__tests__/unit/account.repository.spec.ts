import { Account } from '../../entities/account.entity';
import { Test } from '@nestjs/testing';
import { CreateAccountDto, UpdateAccountDto } from '../../dtos';
import { AccountRepository } from '../../account.repository';
import { accountStub } from '../stubs';
import { accountProviders } from '../../entities/account.providers';
import { DatabaseModule } from '../../../../../database/database.module';

describe('AccountRepository', () => {
  let accountRepository: AccountRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [...accountProviders, AccountRepository],
    }).compile();

    accountRepository = module.get<AccountRepository>(AccountRepository);

    for (const account of accountStub(3) as Account[]) {
      await accountRepository.create(account);
    }
  });

  afterEach(async () => {
    for (const account of await accountRepository.getAll()) {
      await accountRepository.delete(account.id);
    }
  });

  describe('GetAll', () => {
    let accounts: Account[];

    beforeEach(async () => {
      accounts = await accountRepository.getAll();
    });

    it('should return array of users', async () => {
      expect(accounts[0]).toBeTruthy();
      expect(accounts[1]).toBeTruthy();
      expect(accounts[2]).toBeTruthy();
    });
  });

  describe('GetById', () => {
    let account: Account;

    beforeEach(async () => {
      account = await accountRepository.getById(1);
    });

    it('should return user by id', async () => {
      expect(account.id).toEqual(1);
    });
  });

  describe('Delete', () => {
    beforeEach(async () => {
      await accountRepository.delete(1);
    });

    it('should user be deleted', async () => {
      expect(await accountRepository.getById(1)).toBeFalsy();
    });
  });

  describe('Update', () => {
    let updateAccount: UpdateAccountDto;

    beforeEach(async () => {
      updateAccount = { password: '123123123' };
      await accountRepository.update(1, updateAccount);
    });

    it('should user pass be updated', async () => {
      expect((await accountRepository.getById(1)).password).toEqual(
        '123123123',
      );
    });
  });

  describe('Create', () => {
    let createAccount: CreateAccountDto;
    let account: Account;

    beforeEach(async () => {
      createAccount = accountStub() as Account;
      account = await accountRepository.create(createAccount);
    });

    it('should return created user', async () => {
      expect(account.id).toEqual(1);
    });
  });
});
