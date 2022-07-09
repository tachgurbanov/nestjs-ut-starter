import { accountStub } from '../__tests__/stubs';

export const AccountService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(accountStub()),
  update: jest.fn().mockResolvedValue(accountStub()),
  delete: jest.fn().mockResolvedValue(accountStub()),
  getById: jest.fn().mockResolvedValue(accountStub()),
  getAll: jest.fn().mockResolvedValue(accountStub(3)),
});
