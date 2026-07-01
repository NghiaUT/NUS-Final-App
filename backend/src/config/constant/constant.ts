import 'dotenv/config';

export const constant = {
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET ?? 'Secret 1',
  REFRESH_TOKEN_SCRET: process.env.REFRESH_TOKEN_SCRET ?? 'Secret 2',
};
