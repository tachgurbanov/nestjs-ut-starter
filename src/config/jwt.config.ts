import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  key: {
    public: process.env.PUBLIC_KEY,
    private: process.env.PRIVATE_KEY,
  },
}));
