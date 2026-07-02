import crypto from 'crypto';

export const generateHashedToken = () => {
  const token = crypto.randomBytes(32).toString('hex');

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  return { token, hashedToken };
};

export const hashToken = (token: string) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};
