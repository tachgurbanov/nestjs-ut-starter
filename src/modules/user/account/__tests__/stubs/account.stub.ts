import { Account } from '../../entities/account.entity';
import { faker } from '@faker-js/faker';

export const accountStub = (numberOfData = 1): Account | Account[] => {
  if (numberOfData > 1) {
    const arrayOfAccounts: Account[] = [];
    for (let i = 0; i < numberOfData; i++) {
      arrayOfAccounts.push({
        id: i,
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
    }
    return arrayOfAccounts;
  }

  return {
    id: numberOfData,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};
