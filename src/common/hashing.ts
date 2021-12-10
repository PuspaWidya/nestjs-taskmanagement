import * as bcrypt from 'bcryptjs';

export async function hashingPass(password) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}

export async function comparePass(password, hash) {
  return bcrypt.compare(password, hash);
}
