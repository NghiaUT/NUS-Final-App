import express from 'express';
import { userController } from '../controllers/user.controller.js';
import {
  checkPermission,
  optionalVerifyToken,
  verifyToken,
} from '../middlewares/auth.middleware.js';

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

// Route handle update user Profile.
userRouter.put(
  '/:id/profile',
  verifyToken,
  checkPermission(['USER', 'ADMIN']),
  userController.getFollowerUser
);

export default userRouter;
