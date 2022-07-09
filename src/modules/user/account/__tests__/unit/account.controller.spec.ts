import { Account } from '../../entities/account.entity';
import { Test } from '@nestjs/testing';
import { AccountController } from '../../account.controller';
import { AccountService } from '../../account.service';
import { CreateAccountDto, UpdateAccountDto } from '../../dtos';
import { accountStub } from '../stubs';

jest.mock('../../account.service');

describe('AccountController', () => {
  let accountController: AccountController;
  let accountService: AccountService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService],
    }).compile();

    accountService = module.get<AccountService>(AccountService);
    accountController = module.get<AccountController>(AccountController);
  });

  describe('GetAllAccounts', () => {
    let accounts: Account[];

    beforeEach(async () => {
      accounts = await accountController.getAll();
    });

    it('should call accountService', async () => {
      expect(accountService.getAll).toHaveBeenCalled();
    });

    it('should return array of users', async () => {
      expect(accounts[0]).toBeTruthy();
      expect(accounts[1]).toBeTruthy();
      expect(accounts[2]).toBeTruthy();
    });
  });

  describe('GetAccountById', () => {
    let account: Account;

    beforeEach(async () => {
      account = await accountController.getById('1');
    });

    it('should call accountService', async () => {
      expect(accountService.getById).toHaveBeenCalledWith(1);
    });

    it('should return user by id', async () => {
      expect(account.id).toEqual(1);
    });
  });

  describe('DeleteAccount', () => {
    let account: Account;

    beforeEach(async () => {
      account = await accountController.delete('1');
    });

    it('should call accountService', async () => {
      expect(accountService.delete).toHaveBeenCalledWith(1);
    });

    it('should return deleted user', async () => {
      expect(account.id).toEqual(1);
    });
  });

  describe('UpdateAccount', () => {
    let updateAccount: UpdateAccountDto;
    let account: Account;

    beforeEach(async () => {
      updateAccount = { email: 'updated@mail.com' };
      account = await accountController.update('1', updateAccount);
    });

    it('should call accountService', async () => {
      expect(accountService.update).toHaveBeenCalledWith(1, updateAccount);
    });

    it('should return updated user', async () => {
      expect(account.id).toEqual(1);
    });
  });

  describe('CreateAccount', () => {
    let createAccount: CreateAccountDto;
    let account: Account;

    beforeEach(async () => {
      createAccount = accountStub() as Account;
      account = await accountService.create(createAccount);
    });

    it('should call accountRepository', async () => {
      expect(accountService.create).toHaveBeenCalledWith(createAccount);
    });

    it('should return created user', async () => {
      expect(account.id).toEqual(1);
    });
  });
});
