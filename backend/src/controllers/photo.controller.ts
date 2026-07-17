import type { NextFunction, Request, Response } from 'express';
import { PhotoService } from '../services/photo.service.js';
import { sendSuccessRes } from '../utils/sendRespone.util.js';
import { BadRequestError } from '../utils/apiError.js';

export const photoController = {
  getAllPhotoDiscover: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query = req.query;
      if (!query.page || !query.limit) {
        throw new BadRequestError('Invalid query!');
      }
      const page = parseInt((query.page as string) || '1');
      const limit = parseInt((query.limit as string) || '10');
      const currentUserId = req?.user?.id ?? null;
      const result = await PhotoService.getAllPhotoDiscover(
        page,
        limit,
        currentUserId
      );
      sendSuccessRes(res, 'Get Photo succesfully', result, 200);
    } catch (error) {
      next(error);
    }
  },

  getAllPhotoFeed: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      if (!query.page || !query.limit) {
        throw new BadRequestError('Invalid query!');
      }
      const page = parseInt((query.page as string) || '1');
      const limit = parseInt((query.limit as string) || '10');
      const result = await PhotoService.getAllPhotoFeed(
        page,
        limit,
        req.user.id
      );
      sendSuccessRes(res, 'Get Photo succesfully', result, 200);
    } catch (error) {
      next(error);
    }
  },

  getPhoto: async (req: Request, res: Response, next: NextFunction) => {
    console.log('[Controller] This Controller handle data and pass to service');
    try {
      const { id: photoId } = req.params;
      const userId = req.user?.id;

      if (!photoId || Array.isArray(photoId)) {
        throw new BadRequestError('Invalid Request!');
      }
      const result = await PhotoService.getPhoto(userId, photoId);
      sendSuccessRes(res, 'Get Photo succesfully', result, 200);
    } catch (error) {
      next(error);
    }
  },

  newPhoto: async (req: Request, res: Response, next: NextFunction) => {
    console.log('[Controller] This Controller handle data and pass to service');
    try {
      if (!req.file) {
        throw new BadRequestError('No image found!');
      }

      const data = { ...req.body, photo: req.file } satisfies FormData;
      const result = await PhotoService.newPhoto(data, req.user?.id);
      sendSuccessRes(res, 'Adding new Photo succesfully', result, 201);
    } catch (error) {
      next(error);
    }
  },

  editPhoto: async (req: Request, res: Response, next: NextFunction) => {
    console.log('[Controller] This Controller handle data and pass to service');
    try {
      const { id: photoId } = req.params;
      const data = { ...req.body, photo: req.file } satisfies FormData;

      if (!photoId || Array.isArray(photoId)) {
        throw new BadRequestError('Invalid Request!');
      }

      const result = await PhotoService.editPhoto(data, req.user?.id, photoId);
      sendSuccessRes(res, 'Edit photo successfully', result, 200);
    } catch (error) {
      next(error);
    }
  },

  deletePhoto: async (req: Request, res: Response, next: NextFunction) => {
    console.log('[Controller] This Controller handle data and pass to service');
    try {
      const { id: photoId } = req.params;

      if (!photoId || Array.isArray(photoId)) {
        throw new BadRequestError('Invalid Request!');
      }

      const result = await PhotoService.deletePhoto(req.user?.id, photoId);
      sendSuccessRes(res, 'Delete Photo Sucessfully', result, 200);
    } catch (error) {
      next(error);
    }
  },

  likePhoto: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: photoId } = req.params;

      if (!photoId || Array.isArray(photoId)) {
        throw new BadRequestError('Invalid Request!');
      }

      await PhotoService.toggleLike(req.user.id, photoId, 'post');
      sendSuccessRes(res, 'Like photo successfull', null, 200);
    } catch (error) {
      next(error);
    }
  },

  unlikePhoto: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: photoId } = req.params;

      if (!photoId || Array.isArray(photoId)) {
        throw new BadRequestError('Invalid Request!');
      }

      await PhotoService.toggleLike(req.user.id, photoId, 'delete');
      sendSuccessRes(res, 'Unlike photo successfull', null, 200);
    } catch (error) {
      next(error);
    }
  },
};
