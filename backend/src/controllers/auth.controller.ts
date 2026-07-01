import { type Request, type Response, type NextFunction } from 'express';
import { AuthService } from '../services/auth.service.js';
import { ApiError } from '../utils/apiError.js';

export const authController = {
  singup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Gọi thẳng xuống Service
      const data = req.body;
      if (data.password !== data.confirmedPassword) {
        throw new ApiError(400, 'Confirmed Password different from Password!');
      }
      const { confirmedPassword, ...userData } = data;
      const result = await AuthService.signup(userData);

      res.status(201).json({
        status: 'success',
        data: {
          user: result.user,
        },
      });
    } catch (error) {
      next(error); // Chuyển lỗi xuống error.middleware.ts
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Gọi xuống service:
      const result = await AuthService.login(req.body);

      // Set Refresh Token vào HttpOnly Cookie để bảo mật
      res.cookie('refreshToken', result.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(200).json({
        status: 'success',
        data: {
          user: result.user,
          accessToken: result.tokens.accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
