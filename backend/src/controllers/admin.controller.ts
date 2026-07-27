import type { Request, Response, NextFunction } from 'express';
import { AdminService } from '../services/admin.service.js';
import { BadRequestError } from '../utils/apiError.js';
import { sendSuccessRes } from '../utils/sendRespone.util.js';
import { PhotoService } from '../services/photo.service.js';
import { AlbumService } from '../services/album.service.js';

export const adminController = {
  getUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      if (!query.page || !query.limit) {
        throw new BadRequestError('Invalid query!');
      }
      const page = parseInt((query.page as string) || '1');
      const limit = parseInt((query.limit as string) || '10');
      const result = await AdminService.getUsers(page, limit);
      sendSuccessRes(res, 'Get User List successfull', result, 200);
    } catch (error) {
      next(error);
    }
  },

  getUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: userId } = req.params;
      if (!userId || Array.isArray(userId)) {
        throw new BadRequestError('Invalid User ID!');
      }
      const result = await AdminService.getUser(userId);
      sendSuccessRes(res, 'Get User information succefull', result, 200);
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: userId } = req.params;
      if (!userId || Array.isArray(userId)) {
        throw new BadRequestError('Invalid User ID!');
      }
      const data = req.body;
      const avatar = req?.file ?? null;
      const result = await AdminService.updateUser(userId, data, avatar);
      sendSuccessRes(res, 'Update User information succefull', result, 201);
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: userId } = req.params;
      if (!userId || Array.isArray(userId)) {
        throw new BadRequestError('Invalid User ID!');
      }
      const result = await AdminService.deleteUser(userId);
      sendSuccessRes(res, 'Delete User information succefull', result, 200);
    } catch (error) {
      next(error);
    }
  },

  getPhotos: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      if (!query.page || !query.limit) {
        throw new BadRequestError('Invalid query!');
      }
      const page = parseInt((query.page as string) || '1');
      const limit = parseInt((query.limit as string) || '10');
      const result = await AdminService.getAllPhotos(page, limit);
      sendSuccessRes(res, 'Get Photo List Successfull', result, 200);
    } catch (error) {
      next(error);
    }
  },

  getAlbums: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      if (!query.page || !query.limit) {
        throw new BadRequestError('Invalid query!');
      }
      const page = parseInt((query.page as string) || '1');
      const limit = parseInt((query.limit as string) || '10');
      const result = await AdminService.getAllAlbums(page, limit);
      sendSuccessRes(res, 'Get list albums successfull', result, 200);
    } catch (error) {
      next(error);
    }
  },

  editPhoto: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: photoId } = req.params;
      if (!photoId || Array.isArray(photoId)) {
        throw new BadRequestError('Invalid Photo!');
      }
      const data = { ...req.body, photo: req.file } satisfies FormData;
      const result = await PhotoService.editPhoto(
        data,
        req?.user.id,
        photoId,
        true
      );
      sendSuccessRes(res, 'Edit photo successfully', result, 200);
    } catch (error) {
      next(error);
    }
  },

  getPhoto: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: photoId } = req.params;
      const userId = req.user?.id;

      if (!photoId || Array.isArray(photoId)) {
        throw new BadRequestError('Invalid Request!');
      }
      const result = await PhotoService.getPhoto(userId, photoId, true);
      sendSuccessRes(res, 'Get Photo succesfully', result, 200);
    } catch (error) {
      next(error);
    }
  },

  deletePhoto: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: photoId } = req.params;

      if (!photoId || Array.isArray(photoId)) {
        throw new BadRequestError('Invalid Request!');
      }

      const result = await PhotoService.deletePhoto(
        req.user?.id,
        photoId,
        true
      );
      sendSuccessRes(res, 'Delete Photo Sucessfully', result, 200);
    } catch (error) {
      next(error);
    }
  },

  editAlbum: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: albumId } = req.params;
      const data = { ...req.body, photo: req.files } satisfies FormData;

      if (!albumId || Array.isArray(albumId)) {
        throw new BadRequestError('Invalid Request!');
      }
      const result = await AlbumService.editAlbum(
        data,
        req?.user.id,
        albumId,
        true
      );
      sendSuccessRes(res, 'Edit the album successfully!', result, 201);
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

      const result = await AlbumService.deleteAlbum(
        req.user?.id,
        albumId,
        true
      );
      sendSuccessRes(res, 'Delete Album Sucessfully', result, 200);
    } catch (error) {
      next(error);
    }
  },

  getAlbum: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: albumId } = req.params;
      const userId = req.user?.id;

      if (!albumId || Array.isArray(albumId)) {
        throw new BadRequestError('Invalid Request!');
      }
      const result = await AlbumService.getAlbum(userId, albumId, true);
      sendSuccessRes(res, 'Get Album succesfully', result, 200);
    } catch (error) {
      next(error);
    }
  },
};
