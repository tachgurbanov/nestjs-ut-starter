import { Account } from '../../entities/account.entity';
import { accountStub } from '../stubs';
import { AccountRepository } from '../../account.repository';
import { AppModule } from '../../../../../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ValidationPipe } from '@nestjs/common';

describe('AccountController', () => {
  let accountRepository: AccountRepository;
  let httpServer: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    accountRepository = module.get<AccountRepository>(AccountRepository);
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    const allAccounts = await accountRepository.getAll();
    for (const account of allAccounts) {
      await accountRepository.delete(account.id);
    }
  });

  describe('CreateAccount', () => {
    describe('TypeValidation', () => {
      let account: Account;

      beforeEach(() => {
        account = accountStub() as Account;
      });

      it('email must be an email', async () => {
        const response = await request(httpServer)
          .post('/account')
          .send({ email: '', password: account.password });
        expect(response.status).toBe(400);
        expect(response.body.message).toContainEqual('email must be an email');
      });

      it('password must be a string', async () => {
        const response = await request(httpServer)
          .post('/account')
          .send({ email: account.email, password: 1 });
        expect(response.status).toBe(400);
        expect(response.body.message).toContainEqual(
          'password must be a string',
        );
      });

      it('password must be longer than 8 char', async () => {
        const response = await request(httpServer)
          .post('/account')
          .send({ email: account.email, password: '1234567' });
        expect(response.status).toBe(400);
        expect(response.body.message).toContainEqual(
          'password must be longer than or equal to 8 characters',
        );
      });
    });

    it('return account without password after create', async () => {
      const account = accountStub() as Account;
      const response = await request(httpServer).post('/account').send(account);
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ id: account.id, email: account.email });
    });
  });

  describe('GetAllAccounts', () => {
    let accounts: Account[];
    let accountsWithoutPassword: any[];

    beforeAll(async () => {
      accountsWithoutPassword = [];
      accounts = accountStub(10) as Account[];
      for (const account of accounts) {
        await accountRepository.create(account);
        accountsWithoutPassword.push({
          id: account.id,
          email: account.email,
        });
      }
    });

    it('return all accounts without password', async () => {
      const response = await request(httpServer).get('/account');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.arrayContaining(accountsWithoutPassword),
      );
    });
  });

  describe('GetAccountById', () => {
    let account: Account;
    let accountWithoutPassword: any;

    beforeEach(async () => {
      account = accountStub() as Account;
      accountWithoutPassword = { id: account.id, email: account.email };
      await accountRepository.create(account);
    });

    it('get an exist account without password', async () => {
      const response = await request(httpServer).get(
        '/account/' + account.id.toString(),
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual(accountWithoutPassword);
    });
  });

  describe('DeleteAccount', () => {
    let account: Account;

    beforeEach(async () => {
      account = accountStub() as Account;
      await accountRepository.create(account);
    });

    it('delete an exist account', async () => {
      const response = await request(httpServer).delete(
        '/account/' + account.id.toString(),
      );
      expect(response.status).toBe(200);
      expect(await accountRepository.getById(account.id)).toBeFalsy();
    });
  });

  describe('UpdateAccount', () => {
    describe('TypeValidation', () => {
      let account: Account;
      let updateValues: Account;

      beforeEach(() => {
        account = accountStub() as Account;
        updateValues = accountStub() as Account;
      });

      it('email must be an email', async () => {
        const response = await request(httpServer)
          .patch('/account/' + account.id.toString())
          .send({ email: '', password: updateValues.password });
        expect(response.status).toBe(400);
        expect(response.body.message).toContainEqual('email must be an email');
      });

      it('password must be a string', async () => {
        const response = await request(httpServer)
          .patch('/account/' + account.id.toString())
          .send({ email: updateValues.email, password: 1 });
        expect(response.status).toBe(400);
        expect(response.body.message).toContainEqual(
          'password must be a string',
        );
      });

      it('password must be longer than 8 char', async () => {
        const response = await request(httpServer)
          .patch('/account/' + account.id.toString())
          .send({ email: updateValues.email, password: '1234567' });
        expect(response.status).toBe(400);
        expect(response.body.message).toContainEqual(
          'password must be longer than or equal to 8 characters',
        );
      });
    });

    describe('UpdatePartial', () => {
      let account: Account;
      let updateValues: Account;

      beforeEach(async () => {
        account = accountStub() as Account;
        updateValues = accountStub() as Account;
        await accountRepository.create(account);
      });

      it('update password', async () => {
        const passwordBeforeUpdate = (
          await accountRepository.getById(account.id)
        ).password;
        const response = await request(httpServer)
          .patch('/account/' + account.id.toString())
          .send({ password: updateValues.password });
        expect(response.status).toBe(200);
        expect(
          (await accountRepository.getById(account.id)).password,
        ).not.toEqual(passwordBeforeUpdate);
      });

      it('update email', async () => {
        const response = await request(httpServer)
          .patch('/account/' + account.id.toString())
          .send({ email: updateValues.email });
        expect(response.status).toBe(200);
        expect((await accountRepository.getById(account.id)).email).toEqual(
          updateValues.email,
        );
      });
    });
  });
});
