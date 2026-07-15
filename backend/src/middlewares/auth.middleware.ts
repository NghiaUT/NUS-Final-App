// Tách lấy token ra và gắn vào req:
import { type Request, type Response, type NextFunction } from 'express';
import {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
} from '../utils/apiError.js';
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

export const optionalVerifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization as string;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      req.user = null; // Gán null để controller biết đây là guest
      return next();
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      req.user = null; // Gán null để controller biết đây là guest
      return next();
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

export const checkPermission = (roles: string[] = []) => {
  // Usage: checkRole(["USER", "ADMIN"])
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new UnauthorizedError('User not found!');
      }

      const { role } = req.user;

      if (!role) {
        throw new ForbiddenError('Can not determine the user role!');
      }

      if (!roles.includes(role)) {
        throw new ForbiddenError('You do not have right access to this');
      }

      console.log('========> Role cua user', role);
      next();
    } catch (error) {
      next(error);
    }
  };
};
