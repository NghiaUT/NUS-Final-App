// Tách lấy token ra và gắn vào req:
import jwt from 'jsonwebtoken';
import { type Request, type Response, type NextFunction } from 'express';
import { constant } from '../config/constant/constant.js';
import { BadRequestError, UnauthorizedError } from '../utils/apiError.js';

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
    const decoded = jwt.verify(token, constant.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      throw new UnauthorizedError('Missing Information');
    }
    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};
