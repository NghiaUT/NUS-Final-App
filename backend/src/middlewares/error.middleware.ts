import { type Request, type Response, type NextFunction } from 'express';
import { ApiError } from '../utils/apiError.js';
import { constant } from '../config/constant/constant.js';
import { sendErrorRes } from '../utils/sendRespone.util.js';
import { MulterError } from 'multer';
import { classifyPrismaError, PrismaError } from '../utils/prismaError.js';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Error found in app: \n', '='.repeat(50), '\n', err);

  const prismaError = classifyPrismaError(err);

  let statusCode = 500;
  let message = 'Internal Server Error';
  let errCode = '';

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errCode = err.errCode;
  }

  if (err instanceof MulterError) {
    statusCode = 400;
    message = '[Multer]' + err.message;
  }

  if (prismaError) {
    statusCode = prismaError.statusCode;
    message = prismaError.message;
    errCode = prismaError.errCode;
  }

  //   Formatting
  const stack =
    constant.NODE_ENV === 'development' ? { stack: err.stack } : null;
  sendErrorRes(res, message, statusCode, stack, errCode);
};
