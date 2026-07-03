import bcrypt from 'bcrypt';
import prisma from '../config/prisma/prisma.init.js';
import { ApiError, NotFoundError } from '../utils/apiError.js';
import {
  sendResetPasswordEmail,
  sendWelcomeAndVerifyEmail,
} from './email.service.js';
import { generateToken, verifyAndCheckExpiration } from '../utils/jwt.util.js';
import { generateDefaultAvatar } from '../utils/avatar.util.js';
import { generateHashedToken, hashToken } from '../utils/token.util.js';
import { constant } from '../config/constant/constant.js';

const SALT = 10;

export class AuthService {
  static async signup(userData: any) {
    // 1. Validate the user
    const existingUser = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (existingUser) {
      throw new ApiError(400, 'Email already exists!');
    }

    // 2. Hashing the password.
    const hashedPassword = await bcrypt.hash(userData.password, SALT);

    // 3. Store the user to DB, create Token for verify and send Email.
    const verifyToken = generateHashedToken();

    const newUser = await prisma.user.create({
      data: {
        ...userData,
        avatarUrl: generateDefaultAvatar(
          userData.firstName || 'User',
          userData.lastName || `${userData.id}`
        ),
        password: hashedPassword,
        role: 'USER', // Nếu có role trong payload thì ghi đè lại -> ADMIN sẽ đăng ký kiểu khác
        verificationToken: verifyToken.hashedToken,
        verificationExpire: new Date(Date.now() + 15 * 60 * 1000), // 15 phút.
        isVerified: false,
      },
    });

    sendWelcomeAndVerifyEmail(
      newUser.email,
      newUser.firstName ?? 'User',
      verifyToken.token
    ).catch(console.error);

    return { user: { id: newUser.id, email: newUser.email } };
  }

  static async login(userData: any) {
    const user = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (!user) {
      throw new NotFoundError('Wrong email or password!');
    }

    if (!user.isVerified) {
      throw new ApiError(400, 'Account is not verified or deactive!');
    }

    if (!user.isActive) {
      throw new ApiError(400, 'Account is not verified or deactive!');
    }

    const isAuth = await bcrypt.compare(userData.password, user.password);

    if (!isAuth) {
      throw new ApiError(400, 'Wrong email or password!');
    }

    // Return tokens when login
    const tokens = generateToken({
      id: user.id,
      name: `${user.firstName || 'User'} ${user.lastName || ''}`.trim(),
      role: user.role,
      email: user.email,
      avatarUrl:
        user.avatarUrl ??
        generateDefaultAvatar(
          user.firstName || 'User',
          user.lastName || `${user.id}`
        ),
    });

    // Update last login:
    // Mẹo tối ưu: 1. Nên lưu tạm vào redis trước khi ghi xuống vào DB
    // 2. Chỉ lưu last login nếu 2 lần cách nhau trên 30p (Đang thực hiện)
    if (
      !user.lastLogin ||
      Math.abs(user.lastLogin.getTime() - Date.now()) / (1000 * 60) >=
        30 * 60 * 1000
    ) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          lastLogin: new Date(),
        },
      });
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        avatarUrl: user.avatarUrl,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      tokens,
    };
  }

  static async verifyUser(token: string) {
    // Nhận token và thực hiện verify người dùng, set isVerified thành true.
    // 1. Hashed ngược lại token và kiểm tra:
    const hashedToken = hashToken(token);

    // 2. Tìm kiếm user có hashedToken tương ứng và chưa hết hạn.
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: hashedToken,
      },
    });

    if (!user) {
      throw new ApiError(400, 'Token is invalid or has expired');
    }

    // 3. Xóa token thừa và ném lỗi:
    if (user.verificationExpire && user.verificationExpire < new Date()) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          verificationExpire: null,
          verificationToken: null,
        },
      });

      throw new ApiError(400, 'Token has expired. Please request a new one.');
    }

    // 4. Cập nhật tình trạng user vào DB.
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
        verificationToken: null,
        verificationExpire: null,
      },
    });

    return {
      user: { id: user.id, email: user.email },
      directlink: `${constant.CLIENT_URL}/login`,
    };
  }

  static async forgotPassword(email: string) {
    // 1. Tìm kiếm người dùng trong DB:
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new ApiError(400, 'Wrong email or password!');
    }

    // 2. Tạo chuỗi token ngẫu nhiên và gửi về phía người dùng email.
    const token = generateHashedToken();

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetPasswordToken: token.hashedToken,
        resetPasswordExpire: new Date(Date.now() + 15 * 60 * 1000), // 15 phút để validate
      },
    });

    sendResetPasswordEmail(email, token.token).catch(async (error) => {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          resetPasswordToken: null,
          resetPasswordExpire: null,
        },
      });

      console.error(error);
    }); // Rollback nếu có lỗi xảy ra. -> Update sử dụng prisma transaction cho sau này.
  }

  static async resetPassword(token: string, newPassword: string) {
    // 1. Hash ngược lại token nhận được và kiểm tra trong DB. Nếu như token tồn tại mà hết hạn thì xóa token.
    const hashedToken = hashToken(token);

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: hashedToken,
      },
    });

    if (!user) {
      throw new ApiError(400, 'Token is invalid or has expired');
    }

    if (user.resetPasswordExpire && user.resetPasswordExpire < new Date()) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetPasswordExpire: null,
          resetPasswordToken: null,
        },
      });

      throw new ApiError(400, 'Token has expired. Please request a new one.');
    }
    // 2. Hash password và lưu vào DB.
    const hashedPassword = await bcrypt.hash(newPassword, SALT);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetPasswordToken: null,
        resetPasswordExpire: null,
        password: hashedPassword,
      },
    });

    // 3. Trả về link điều hướng người dùng sang trang login.
    return {
      directLink: `${constant.CLIENT_URL}/login`,
    };
  }

  static async checkRefreshToken(token: string) {
    // 1. Kiểm tra refreshToken có còn hạn không, tách ra và check cả userId.
    const { valid, reason, payload } = verifyAndCheckExpiration(
      token,
      'refresh'
    );

    if (!valid) {
      throw new ApiError(
        400,
        'Something is wrong with RefereshToken:' + reason
      );
    }

    const userId = payload?.id;
    if (!userId || isNaN(Number(userId))) {
      throw new ApiError(400, 'Missing or invalid User ID');
    }

    // 2. Tạo accessToken mới và trả về.
    const { accessToken, refreshToken } = generateToken(payload);

    return { accessToken, refreshToken };
  }
}
