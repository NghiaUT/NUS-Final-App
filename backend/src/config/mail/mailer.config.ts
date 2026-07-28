import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { constant } from '../../config/constant/constant.js';

interface MailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

interface MailTransporter {
  sendMail(data: MailData): Promise<void>;
}

// Nodemailer / SMTP config, dùng cho development (ví dụ Mailtrap, Ethereal...).
const developmentConfig = {
  host: constant.SMTP_HOST,
  port: Number(constant.SMTP_PORT),
  secure: false, // BẮT BUỘC: false cho port 587
  auth: {
    user: constant.SMTP_USER,
    pass: constant.SMTP_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  logger: true,
  debug: true,
};

const createDevTransporter = (): MailTransporter => {
  const nodemailerTransporter = nodemailer.createTransport(
    developmentConfig as nodemailer.TransportOptions
  );

  return {
    async sendMail(data) {
      // nodemailer tự throw khi lỗi, chỉ cần return/await để lỗi propagate ra ngoài.
      await nodemailerTransporter.sendMail({
        from: data.from ?? constant.SMTP_USER,
        to: data.to,
        subject: data.subject,
        html: data.html,
      });
    },
  };
};

const createProdTransporter = (): MailTransporter => {
  const resend = new Resend(constant.RESEND_API_KEY);

  return {
    async sendMail(data) {
      const { error } = await resend.emails.send({
        from: data.from ?? constant.SMTP_USER,
        to: data.to,
        subject: data.subject,
        html: data.html,
      });

      if (error) {
        throw new Error(error.message);
      }
    },
  };
};

// Interface đồng nhất (sendMail) bất kể môi trường nào,
// nơi gọi không cần biết bên dưới là SMTP hay HTTP API.
const transporter: MailTransporter =
  constant.NODE_ENV === 'production'
    ? createProdTransporter()
    : createDevTransporter();

export default transporter;
