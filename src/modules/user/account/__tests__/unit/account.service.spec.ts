import { Account } from '../../entities/account.entity';
import { Test } from '@nestjs/testing';
import { AccountService } from '../../account.service';
import { CreateAccountDto, UpdateAccountDto } from '../../dtos';
import { AccountRepository } from '../../account.repository';
import { accountStub } from '../stubs';

jest.mock('../../account.repository');

describe('AccountService', () => {
  let accountRepository: AccountRepository;
  let accountService: AccountService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AccountRepository, AccountService],
    }).compile();

    accountService = module.get<AccountService>(AccountService);
    accountRepository = module.get<AccountRepository>(AccountRepository);
  });

  describe('GetAll', () => {
    let accounts: Account[];

    beforeEach(async () => {
      accounts = await accountService.getAll();
    });

    it('should call accountRepository', async () => {
      expect(accountRepository.getAll).toHaveBeenCalled();
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
      account = await accountService.getById(1);
    });

    it('should call accountRepository', async () => {
      expect(accountRepository.getById).toHaveBeenCalledWith(1);
    });

    it('should return user by id', async () => {
      expect(account.id).toEqual(1);
    });
  });

  describe('Delete', () => {
    let account: Account;

    beforeEach(async () => {
      account = await accountService.delete(1);
    });

    it('should call accountRepository', async () => {
      expect(accountRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should return deleted user', async () => {
      expect(account.id).toEqual(1);
    });
  });

  describe('Update', () => {
    let updateAccount: UpdateAccountDto;
    let account: Account;

    beforeEach(async () => {
      updateAccount = { password: '123123123' };
      account = await accountService.update(1, updateAccount);
    });

    it('should call accountRepository', async () => {
      expect(accountRepository.update).toHaveBeenCalledWith(1, updateAccount);
    });

    it('should return updated user', async () => {
      expect(account.id).toEqual(1);
    });

    it('should hash updated password', async () => {
      expect(account.password).not.toEqual('123123123');
    });
  });

  describe('Create', () => {
    let createAccount: CreateAccountDto;
    let account: Account;

    beforeEach(async () => {
      createAccount = accountStub() as Account;
      account = await accountService.create(createAccount);
    });

    it('should call accountRepository', async () => {
      expect(accountRepository.create).toHaveBeenCalledWith(createAccount);
    });

    it('should return created user', async () => {
      expect(account.id).toEqual(1);
    });

    it('should hash password', async () => {
      expect(account.password).not.toEqual(createAccount.password);
    });
  });
});
