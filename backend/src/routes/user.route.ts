import express from 'express';
import { userController } from '../controllers/user.controller.js';
import {
  checkPermission,
  optionalVerifyToken,
  verifyToken,
} from '../middlewares/auth.middleware.js';
import upload from '../config/multer/multer.config.js';

const userRouter = express.Router();

userRouter.get(
  '/:id/stats',
  optionalVerifyToken,
  userController.getProfileInformation
);

userRouter.get(
  '/:id/followers',
  optionalVerifyToken,
  userController.getFollowerUser
);

userRouter.get(
  '/:id/followings',
  optionalVerifyToken,
  userController.getFollowingUser
);

userRouter.get('/:id/photos', optionalVerifyToken, userController.getUserPhoto);

userRouter.get('/:id/albums', optionalVerifyToken, userController.getUserAlbum);

// Route handle for users follow and update profile.
userRouter.post(
  '/:id/follow',
  verifyToken,
  checkPermission(['USER']),
  userController.followUser
);

userRouter.delete(
  '/:id/follow',
  verifyToken,
  checkPermission(['USER']),
  userController.unfollowUser
);

userRouter.put(
  '/:id/profile',
  verifyToken,
  checkPermission(['USER', 'ADMIN']),
  upload.single('avatar'),
  userController.updateUserProfile
);

export default userRouter;
