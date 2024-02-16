import * as bcrypt from 'bcrypt';

const SALT = 10;

export function hashPassword(rawPassword: string) {
  return bcrypt.hashSync(rawPassword, SALT);
}

export function comparePasswords(rawPassword: string, password: string) {
  return bcrypt.compareSync(rawPassword, password);
}
