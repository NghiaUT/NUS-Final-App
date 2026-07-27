import nodemailer from 'nodemailer';
import { constant } from '../../config/constant/constant.js';

const developmentConfig = {
  host: constant.SMTP_HOST,
  port: Number(constant.SMTP_PORT),
  secure: false, // BẮT BUỘC: false cho port 587
  auth: {
    user: constant.SMTP_USER,
    pass: constant.SMTP_PASS,
  },
  logger: true,
  debug: true,
};

const productionConfig = {
  host: 'smtp.resend.com',
  port: 465,
  secure: true,
  auth: {
    user: 'resend',
    pass: constant.RESEND_API_KEY,
  },
};

const transporterConfig =
  constant.NODE_ENV === 'production' ? productionConfig : developmentConfig;

const transporter = nodemailer.createTransport(
  transporterConfig as nodemailer.TransportOptions
);

export default transporter;
