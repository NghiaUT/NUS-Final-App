import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { constant } from '../../config/constant/constant.js';
import type { EmailJobData } from '../queue/email.queue.js';

interface MailTransporter {
  sendMail(data: EmailJobData): Promise<void>;
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
        text: data.text,
      });
    },
  };
};

const createProdTransporter = (): MailTransporter => {
  const resend = new Resend(constant.RESEND_API_KEY);

  return {
    async sendMail(data) {
      const base = {
        from: data.from ?? constant.SMTP_USER,
        to: data.to,
        subject: data.subject,
      };

      const { error } =
        data.html !== undefined
          ? await resend.emails.send({ ...base, html: data.html })
          : await resend.emails.send({ ...base, text: data.text ?? '' });

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
