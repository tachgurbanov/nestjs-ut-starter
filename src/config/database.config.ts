import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  test: {
    file: process.env.DATABASE_TEST_FILE_NAME + '.sqlite3',
  },
  development: {
    file: process.env.DATABASE_DEV_FILE_NAME + '.sqlite3',
  },
}));
