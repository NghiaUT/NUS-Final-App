import type { NextFunction, Request, Response } from 'express';
import { AlbumService } from '../services/album.service.js';
import { sendSuccessRes } from '../utils/sendRespone.util.js';

export const albumController = {
  newAlbum: (req: Request, res: Response, next: NextFunction) => {
    console.log('[Controller] This Controller handle data and pass to service');
    AlbumService.newAlbum();
    sendSuccessRes(res, 'Thanh cong', null, 200);
  },

  editAlbum: (req: Request, res: Response, next: NextFunction) => {
    console.log('[Controller] This Controller handle data and pass to service');
    AlbumService.editAlbum();
    sendSuccessRes(res, 'Thanh cong', null, 200);
  },

  deleteAlbum: (req: Request, res: Response, next: NextFunction) => {
    console.log('[Controller] This Controller handle data and pass to service');
    AlbumService.deleteAlbum();
    sendSuccessRes(res, 'Thanh cong', null, 200);
  },
};
