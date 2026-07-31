import type { NextFunction, Request, Response } from 'express';
import { AlbumService } from '../services/album.service.js';
import { sendSuccessRes } from '../utils/sendRespone.util.js';
import { BadRequestError } from '../utils/apiError.js';
import {
  albumImageSchema,
  formInfoSchema,
  validateData,
} from '../utils/validator.util.js';

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
  deletedPhotosId?: string[];
};

type SharingMode = 'PUBLIC' | 'PRIVATE';

export const albumController = {
  getAllAlbumDiscover: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log('[Controller] This Controller handle data and pass to service');
    try {
      const query = req.query;
      if (!query.page || !query.limit) {
        throw new BadRequestError('Invalid query!');
      }
      const page = parseInt((query.page as string) || '1');
      const limit = parseInt((query.limit as string) || '10');
      const searchQuery =
        typeof query.q === 'string' ? query.q.trim() : undefined;

      const currentUserId = req?.user?.id ?? null;
      const result = await AlbumService.getAllAlbumDiscover(
        page,
        limit,
        currentUserId,
        searchQuery
      );
      sendSuccessRes(res, 'Get All Albums Successfully', result, 200);
    } catch (error) {
      next(error);
    }
  },

  getAllAlbumFeed: async (req: Request, res: Response, next: NextFunction) => {
    console.log('[Controller] This Controller handle data and pass to service');
    try {
      const query = req.query;
      if (!query.page || !query.limit) {
        throw new BadRequestError('Invalid query!');
      }
      const page = parseInt((query.page as string) || '1');
      const limit = parseInt((query.limit as string) || '10');

      const searchQuery =
        typeof query.q === 'string' ? query.q.trim() : undefined;

      const result = await AlbumService.getAllAlbumFeed(
        page,
        limit,
        req.user?.id ?? '1',
        searchQuery
      );
      sendSuccessRes(res, 'Get All Albums Successfully', result, 200);
    } catch (error) {
      next(error);
    }
  },

  getAlbum: async (req: Request, res: Response, next: NextFunction) => {
    console.log('[Controller] This Controller handle data and pass to service');
    try {
      const { id: albumId } = req.params;
      const userId = req.user?.id ?? '1';

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
        throw new BadRequestError('No images found!');
      }
      const validatedBody = validateData(formInfoSchema, req.body);
      const validatedAlbum = validateData(albumImageSchema, req.files);
      const data = { ...validatedBody, photo: validatedAlbum };

      const result = await AlbumService.newAlbum(data, req.user?.id ?? '1');
      sendSuccessRes(res, 'Create new Album Successfully', result, 200);
    } catch (error) {
      next(error);
    }
  },

  editAlbum: async (req: Request, res: Response, next: NextFunction) => {
    console.log('[Controller] This Controller handle data and pass to service');
    try {
      const { id: albumId } = req.params;
      if (!albumId || Array.isArray(albumId)) {
        throw new BadRequestError('Invalid Request!');
      }

      const { deletedPhotosId, ...body } = req.body;

      const validatedBody = validateData(formInfoSchema, body);
      const validatedAlbum = req.files
        ? validateData(albumImageSchema, req.files)
        : null;

      const data = {
        ...{ deletedPhotosId, ...validatedBody },
        photo: validatedAlbum,
      };

      const result = await AlbumService.editAlbum(
        data,
        req.user?.id ?? '1',
        albumId
      );
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

      const result = await AlbumService.deleteAlbum(
        req.user?.id ?? '1',
        albumId
      );
      sendSuccessRes(res, 'Delete Album Sucessfully', result, 200);
    } catch (error) {
      next(error);
    }
  },

  likeAlbum: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: albumId } = req.params;

      if (!albumId || Array.isArray(albumId)) {
        throw new BadRequestError('Invalid Request!');
      }

      await AlbumService.toggleLike(req.user?.id ?? '1', albumId, 'post');
      sendSuccessRes(res, 'Like album successfull', null, 200);
    } catch (error) {
      next(error);
    }
  },

  unlikeAlbum: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: albumId } = req.params;

      if (!albumId || Array.isArray(albumId)) {
        throw new BadRequestError('Invalid Request!');
      }

      await AlbumService.toggleLike(req.user?.id ?? '1', albumId, 'delete');
      sendSuccessRes(res, 'Unlike album successfull', null, 200);
    } catch (error) {
      next(error);
    }
  },
};
