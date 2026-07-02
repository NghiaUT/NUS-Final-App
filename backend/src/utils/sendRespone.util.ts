import { type Response } from 'express';
export const sendSuccessRes = (
  res: Response,
  message: string = 'Successfully fetch data',
  data: any | null = null,
  statusCode: number = 200
) => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    statusCode,
    data: data,
    timeStamp: new Date(),
  });
};

export const sendErrorRes = (
  res: Response,
  message: string = 'Internal server error',
  statusCode: number = 500,
  stack: any | null = null
) => {
  return res.status(statusCode).json({
    status: 'error',
    message,
    statusCode,
    stack,
    timeStamp: new Date(),
  });
};
