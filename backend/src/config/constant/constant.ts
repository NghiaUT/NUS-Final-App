import 'dotenv/config';

export const constant = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET ?? 'Secret 1',
  REFRESH_TOKEN_SCRET: process.env.REFRESH_TOKEN_SCRET ?? 'Secret 2',
  SMTP_HOST: process.env.SMTP_HOST ?? 'localhost',
  SMTP_PORT: process.env.SMTP_PORT ?? 587,
  SMTP_USER:
    process.env.NODE_ENV === 'development'
      ? (process.env.SMTP_USER ?? 'Username')
      : 'onboarding@resend.dev',
  SMTP_PASS: process.env.SMTP_PASS ?? 'Password',
  CLIENT_URL: process.env.CLIENT_URL ?? 'http://localhost:5173',
  SERVER_URL: process.env.SERVER_URL ?? 'http://localhost:3000',
  REDIS_CLIENT_URL: process.env.REDIS_CLIENT_URL ?? 'redis_client_url',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ?? 'cloud_name',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ?? 'cloud_api_key',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ?? 'cloud_secret',
  RESEND_API_KEY: process.env.RESEND_API_KEY ?? 'resend_api_key',
  STORAGE_PLACE: process.env.STORAGE_PLACE ?? 'cloud',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? 'client_id',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? 'client_secret',
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL ?? 'callback_url',
};
