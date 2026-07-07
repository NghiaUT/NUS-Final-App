import { type Request, type Response, type NextFunction } from 'express';
import { ApiError } from '../utils/apiError.js';
import { constant } from '../config/constant/constant.js';
import { sendErrorRes } from '../utils/sendRespone.util.js';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Error found in app: \n', '='.repeat(50), '\n', err);
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  //   Formatting
  const stack =
    constant.NODE_ENV === 'development' ? { stack: err.stack } : null;
  sendErrorRes(res, message, statusCode, stack);
};
