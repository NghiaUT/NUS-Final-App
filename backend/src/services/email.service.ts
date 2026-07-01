import nodemailer from 'nodemailer';
import { constant } from '../config/constant/constant.js';

const transporter = nodemailer.createTransport({
  host: constant.SMTP_HOST,
  port: constant.SMTP_PORT,
  auth: {
    user: constant.SMTP_USER,
    pass: constant.SMTP_PASS,
  },
});

export const sendWelcomeEmail = async (to: string, name: string) => {
  const mailHtml = '<h1>Finish setup your profile:</h1>';

  await transporter.sendMail({
    from: 'Fotobook <noreply@app.com>',
    to,
    subject: 'Welcome to Fotobook - Our social media platform!',
    text: `Hi ${name}, welcome aboard!`,
    html: mailHtml,
  });
};
