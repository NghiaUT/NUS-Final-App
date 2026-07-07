import 'dotenv/config';

export const constant = {
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET ?? 'Secret 1',
  REFRESH_TOKEN_SCRET: process.env.REFRESH_TOKEN_SCRET ?? 'Secret 2',
  SMTP_HOST: process.env.SMTP_HOST ?? 'localhost',
  SMTP_PORT: process.env.SMTP_PORT ?? 587,
  SMTP_USER: process.env.SMTP_USER ?? 'Username',
  SMTP_PASS: process.env.SMTP_PASS ?? 'Password',
  CLIENT_URL: process.env.CLIENT_URL ?? 'http://localhost:5173',
  SERVER_URL: process.env.SERVER_URL ?? 'http://localhost:3000',
};
