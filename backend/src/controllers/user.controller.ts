import type { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service.js';
import { BadRequestError } from '../utils/apiError.js';
import { sendSuccessRes } from '../utils/sendRespone.util.js';

export const userController = {
  getProfileInformation: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id: targetUserId } = req.params;
      if (!targetUserId || Array.isArray(targetUserId)) {
        throw new BadRequestError('Invalid Request');
      }
      const currentUserId = req.user?.id;
      const result = await UserService.getProfileInformation(
        targetUserId,
        currentUserId
      );
      sendSuccessRes(res, 'Get Profile Information Successfull', result, 200);
    } catch (error) {
      next(error);
    }
  },

  getFollowingUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: targetUserId } = req.params;
      if (!targetUserId || Array.isArray(targetUserId)) {
        throw new BadRequestError('Invalid Request');
      }
      const query = req.query;
      if (!query.page || !query.limit) {
        throw new BadRequestError('Invalid query!');
      }
      const page = parseInt((query.page as string) || '1');
      const limit = parseInt((query.limit as string) || '10');
      const result = await UserService.getFollowingUser(
        targetUserId,
        query,
        limit
      );
      sendSuccessRes(res, 'Get Following User Successfull', result, 200);
    } catch (error) {
      next(error);
    }
  },

  getFollowerUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: targetUserId } = req.params;
      if (!targetUserId || Array.isArray(targetUserId)) {
        throw new BadRequestError('Invalid Request');
      }
      const query = req.query;
      if (!query.page || !query.limit) {
        throw new BadRequestError('Invalid query!');
      }
      const page = parseInt((query.page as string) || '1');
      const limit = parseInt((query.limit as string) || '10');
      const result = await UserService.getFollowerUser(
        targetUserId,
        page,
        limit
      );
      sendSuccessRes(res, 'Get Followers User Successfull', result, 200);
    } catch (error) {
      next(error);
    }
  },

  getUserPhoto: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: targetUserId } = req.params;
      if (!targetUserId || Array.isArray(targetUserId)) {
        throw new BadRequestError('Invalid Request');
      }
      const currentUserId = req.user?.id;
      const query = req.query;
      if (!query.page || !query.limit) {
        throw new BadRequestError('Invalid query!');
      }
      const page = parseInt((query.page as string) || '1');
      const limit = parseInt((query.limit as string) || '10');
      const result = await UserService.getUserPhoto(
        targetUserId,
        currentUserId,
        page,
        limit
      );
      sendSuccessRes(res, 'Get User Photos Successfull', result, 200);
    } catch (error) {
      next(error);
    }
  },

  getUserAlbum: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: targetUserId } = req.params;
      if (!targetUserId || Array.isArray(targetUserId)) {
        throw new BadRequestError('Invalid Request');
      }
      const currentUserId = req.user?.id;
      const query = req.query;
      if (!query.page || !query.limit) {
        throw new BadRequestError('Invalid query!');
      }
      const page = parseInt((query.page as string) || '1');
      const limit = parseInt((query.limit as string) || '10');
      const result = await UserService.getUserAlbum(
        targetUserId,
        currentUserId,
        page,
        limit
      );
      sendSuccessRes(res, 'Get User Albums Successfull', result, 200);
    } catch (error) {
      next(error);
    }
  },
};
