import { constant } from '../config/constant/constant.js';
import { emailQueue } from '../config/queue/email.queue.js';

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
    await emailQueue.add(
      'welcome-emal',
      {
        from: `Fotobook <${constant.SMTP_USER}>`,
        to,
        subject: 'Welcome to Fotobook - Our social media platform!',
        text: `Hi ${name}, welcome aboard!`,
        html: mailHtml,
      },
      {
        attempts: 3, // Nếu lỗi tự động thử lại 3 lần
        backoff: {
          type: 'exponential',
          delay: 2000, // Thử lại sau 2s
        },
      }
    );
  } catch (error) {
    console.error('Lỗi khi thêm Welcome Email vào Queue:', error);
  }
};

export const sendResetPasswordEmail = async (to: string, token: string) => {
  // Đường link trỏ về Front-end
  // Front-end sẽ đọc token từ URL và hiện form nhập mật khẩu mới
  const resetLink = `${constant.CLIENT_URL}/reset-password?token=${token}`;
  const mailHtml = `
      <p>You have requested reset passwrord.</p>
      <p>Click vào link dưới đây để đặt lại mật khẩu (link có hiệu lực trong 15 phút):</p>
      <a href="${resetLink}" target="_blank">Đặt lại mật khẩu</a>
      <p>Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
    `;
  try {
    await emailQueue.add(
      'reset-password-email',
      {
        from: '"Fotobook Security" <noreply@app.com>',
        to,
        subject: 'Password Reset Request',
        html: mailHtml,
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
      }
    );
  } catch (error) {
    console.error('Lỗi khi thêm Reset Password Email vào Queue:', error);
  }
};
