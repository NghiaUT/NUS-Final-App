import { type Request, type Response, type NextFunction } from 'express';
import prisma from '../config/prisma/prisma.init.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccessRes } from '../utils/sendRespone.util.js';

export const healthController = {
  check: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.$queryRaw`SELECT 1`;

      sendSuccessRes(
        res,
        'Server and database connection are healthy',
        {
          status: 'ok',
          service: 'backend',
          uptime: `${process.uptime().toFixed(2)}s`,
          timestamp: new Date().toISOString(),
          database: 'connected',
        },
        200
      );
    } catch (error) {
      next(
        new ApiError(
          503,
          'Server is running but database connection is unavailable'
        )
      );
    }
  },
};
