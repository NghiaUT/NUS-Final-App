import type { NextFunction, Request, Response } from 'express';
import { AlbumService } from '../services/album.service.js';
import { sendSuccessRes } from '../utils/sendRespone.util.js';
import { BadRequestError } from '../utils/apiError.js';

type UploadPhoto = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  path: string;
  destination: string;
  filename: string;
  size: number;
};

export type FormData = {
  title?: string;
  description?: string;
  sharingMode?: SharingMode;
  photo?: UploadPhoto[];
};

type SharingMode = 'PUBLIC' | 'PRIVATE';

export const albumController = {
  getAllAlbum: async (req: Request, res: Response, next: NextFunction) => {
    console.log('[Controller] This Controller handle data and pass to service');
    try {
      const query = req.query;
      if (!query.page || !query.limit) {
        throw new BadRequestError('Invalid query!');
      }
      const page = parseInt((query.page as string) || '1');
      const limit = parseInt((query.limit as string) || '10');
      const result = await AlbumService.getAllAlbum(page, limit);
      sendSuccessRes(res, 'Get All Albums Successfully', result, 200);
    } catch (error) {
      next(error);
    }
  },

  getAlbum: async (req: Request, res: Response, next: NextFunction) => {
    console.log('[Controller] This Controller handle data and pass to service');
    try {
      const { id: albumId } = req.params;
      const userId = req.user?.id;

      if (!albumId || Array.isArray(albumId)) {
        throw new BadRequestError('Invalid Request!');
      }
      const result = await AlbumService.getAlbum(userId, albumId);
      sendSuccessRes(res, 'Get Album succesfully', result, 200);
    } catch (error) {
      next(error);
    }
  },

  newAlbum: async (req: Request, res: Response, next: NextFunction) => {
    console.log('[Controller] This Controller handle data and pass to service');
    try {
      if (!req.files) {
        throw new BadRequestError('No image found!');
      }
      const data = { ...req.body, photo: req.files } satisfies FormData;

      const result = await AlbumService.newAlbum(data, req?.user.id);
      sendSuccessRes(res, 'Create new Album Successfully', result, 200);
    } catch (error) {
      next(error);
    }
  },

  editAlbum: async (req: Request, res: Response, next: NextFunction) => {
    console.log('[Controller] This Controller handle data and pass to service');
    try {
      const { id: albumId } = req.params;
      const data = { ...req.body, photo: req.files } satisfies FormData;

      if (!albumId || Array.isArray(albumId)) {
        throw new BadRequestError('Invalid Request!');
      }
      const result = await AlbumService.editAlbum(data, req?.user.id, albumId);
      sendSuccessRes(res, 'Edit the album successfully!', result, 200);
    } catch (error) {
      next(error);
    }
  },

  deleteAlbum: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: albumId } = req.params;

      if (!albumId || Array.isArray(albumId)) {
        throw new BadRequestError('Invalid Request!');
      }

      const result = await AlbumService.deleteAlbum(req.user?.id, albumId);
      sendSuccessRes(res, 'Delete Album Sucessfully', result, 200);
    } catch (error) {
      next(error);
    }
  },
};
