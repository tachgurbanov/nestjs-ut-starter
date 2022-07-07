import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  sqlite: {
    file: process.env.DATABASE_FILE_NAME + '.sqlite3',
  },
}));
