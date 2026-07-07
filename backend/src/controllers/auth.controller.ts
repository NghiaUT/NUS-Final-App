import { type Request, type Response, type NextFunction } from 'express';
import { AuthService } from '../services/auth.service.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccessRes } from '../utils/sendRespone.util.js';

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

      sendSuccessRes(res, 'Successfully signup', result, 201);
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

      sendSuccessRes(
        res,
        'Successfully login',
        {
          ...result,
          accessToken: result.tokens.accessToken,
          tokens: undefined,
        },
        200
      );
    } catch (error) {
      next(error);
    }
  },

  verifyUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.query;
      if (!token || typeof token !== 'string') {
        throw new ApiError(400, 'Invalid or missing token!');
      }
      const result = await AuthService.verifyUser(token);
      // result chứa directlink để người dùng chuyển sang trang login.
      res.redirect(302, result.directlink);
    } catch (error) {
      next(error);
    }
  },

  forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      await AuthService.forgotPassword(email);
      sendSuccessRes(res, 'Send directlink suscessfully', null, 200);
    } catch (error) {
      next(error);
    }
  },

  resetPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.query;
      if (!token || typeof token !== 'string') {
        throw new ApiError(400, 'Invalid or missing token!');
      }

      const { newPassword } = req.body;
      const result = await AuthService.resetPassword(token, newPassword);

      res.redirect(302, result.directLink);
    } catch (error) {
      next(error);
    }
  },

  getRefreshToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken || typeof refreshToken !== 'string') {
        throw new ApiError(400, 'Missing or invalid Refresh Token');
      }

      const result = await AuthService.checkRefreshToken(refreshToken);

      // Gắn lại refreshToken mới vào.
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      sendSuccessRes(
        res,
        'Get Token Susscessfully',
        { accessToken: result.accessToken },
        200
      );
    } catch (error) {
      next(error);
    }
  },

  getMe: async (req: any, res: Response, next: NextFunction) => {
    try {
      console.log('req.user: ', req.user);
      const result = await AuthService.me(Number(req.user.id));
      sendSuccessRes(res, 'Validate successfull', result, 200);
    } catch (error) {
      next(error);
    }
  },
};
