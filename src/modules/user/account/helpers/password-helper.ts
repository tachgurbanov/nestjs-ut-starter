import { compare, genSalt, hash } from 'bcrypt';

export const passwordToHash = async (password: string): Promise<string> => {
  return await hash(password, await genSalt(10));
};

export const checkPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await compare(password, hash);
};
