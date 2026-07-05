// Tách lấy token ra và gắn vào req:
import { type Request, type Response, type NextFunction } from 'express';
import { BadRequestError, UnauthorizedError } from '../utils/apiError.js';
import { verifyAndCheckExpiration } from '../utils/jwt.util.js';

// Định nghĩa thêm type cho Request Express.
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization as string;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestError('Invalid Token Format');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedError('Missing Access Token');
    }
    const result = verifyAndCheckExpiration(token, 'accessToken');

    if (!result.valid) {
      if (result.reason === 'Expired') {
        throw new UnauthorizedError('JWT Access Token has been expired!');
      } else {
        throw new BadRequestError('JWT has wrong format!');
      }
    }

    req.user = result.payload;

    next();
  } catch (error) {
    next(error);
  }
};
