import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  test: {
    name: process.env.POSTGRES_DATABASE + 'test',
  },
  development: {
    name: process.env.POSTGRES_DATABASE + 'dev',
  },
  production: {
    name: process.env.POSTGRES_DATABASE,
  },
}));
