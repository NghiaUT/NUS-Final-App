import nodemailer from 'nodemailer';
import { constant } from '../config/constant/constant.js';

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

export const sendWelcomeAndVerifyEmail = async (
  to: string,
  name: string,
  token: string
) => {
  const verifyLink = `${constant.SERVER_URL}/api/auth/verify-email?token=${token}`;
  const mailHtml = `
      <p>Bạn đã tạo tài khoản <h1>Fotobook</h1> thành công!</p>
      <p>Click vào link dưới đây để hoàn thành kích hoạt tài khoản (link có hiệu lực trong 15 phút):</p>
      <a href="${verifyLink}" target="_blank">Kích hoạt tài khoản</a>`;
  try {
    await transporter.sendMail({
      from: `Fotobook <${constant.SMTP_USER}>`,
      to,
      subject: 'Welcome to Fotobook - Our social media platform!',
      text: `Hi ${name}, welcome aboard!`,
      html: mailHtml,
    });
  } catch (error) {
    console.error(error);
  }
};

export const sendResetPasswordEmail = async (to: string, token: string) => {
  // Đường link trỏ về Front-end
  // Front-end sẽ đọc token từ URL và hiện form nhập mật khẩu mới
  const resetLink = `${constant.CLIENT_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: '"Fotobook Security" <noreply@app.com>',
    to,
    subject: 'Password Reset Request',
    html: `
      <p>You have requested reset passwrord.</p>
      <p>Click vào link dưới đây để đặt lại mật khẩu (link có hiệu lực trong 15 phút):</p>
      <a href="${resetLink}" target="_blank">Đặt lại mật khẩu</a>
      <p>Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
    `,
  });
};
