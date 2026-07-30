import type { NextFunction, Request, Response } from 'express';
import { removeFileCloudinary } from '../utils/removeFile.util.js';

export const cleanupHandler: (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> = async (err, req, res, next) => {
  try {
    if (req.file?.filename) {
      await removeFileCloudinary(req.file.filename);
    }
    if (req.files) {
      const files = req.files as Express.Multer.File[];
      await Promise.all(
        files.map((file) => {
          if (file?.filename) removeFileCloudinary(file.filename);
        })
      );
    }
  } finally {
    next(err);
  }
};
