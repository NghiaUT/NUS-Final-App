import type { NextFunction, Request, Response } from 'express';
import { PhotoService } from '../services/photo.service.js';
import { sendSuccessRes } from '../utils/sendRespone.util.js';

export const photoController = {
  newPhoto: (req: Request, res: Response, next: NextFunction) => {
    console.log('[Controller] This Controller handle data and pass to service');
    console.log(req.file);
    PhotoService.newPhoto();
    sendSuccessRes(res, 'Thanh cong', null, 200);
  },

  editPhoto: (req: Request, res: Response, next: NextFunction) => {
    console.log('[Controller] This Controller handle data and pass to service');
    PhotoService.editPhoto();
    sendSuccessRes(res, 'Thanh cong', null, 200);
  },

  deletePhoto: (req: Request, res: Response, next: NextFunction) => {
    console.log(req.file);
    console.log('[Controller] This Controller handle data and pass to service');
    PhotoService.deletePhoto();
    sendSuccessRes(res, 'Thanh cong', null, 200);
  },
};
