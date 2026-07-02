import nodemailer from 'nodemailer';
import { constant } from '../../config/constant/constant.js';

const transporter = nodemailer.createTransport({
  host: constant.SMTP_HOST,
  port: Number(constant.SMTP_PORT),
  secure: false, // BẮT BUỘC: false cho port 587
  auth: {
    user: constant.SMTP_USER,
    pass: constant.SMTP_PASS,
  },
  ...(constant.NODE_ENV === 'development'
    ? {
        logger: true,
        debug: true,
      }
    : {}),
} as nodemailer.TransportOptions);

export default transporter;
