import { compare, hash } from 'bcryptjs';

const saltOrRounds = 10;

const generateHash = async (input: string): Promise<string> => {
  return await hash(input, saltOrRounds);
};

const compareHash = async (
  input: string,
  inputHashed: string,
): Promise<any> => {
  return await compare(input, inputHashed);
};

export { generateHash, compareHash };
