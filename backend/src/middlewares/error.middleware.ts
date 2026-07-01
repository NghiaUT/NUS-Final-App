import { type Request, type Response, type NextFunction } from 'express';
import { ApiError } from '../utils/apiError.js';
import { constant } from '../config/constant/constant.js';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  //   Formatting
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(constant.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
