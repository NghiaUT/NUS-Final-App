import express from 'express';
import { userController } from '../controllers/user.controller.js';
import { optionalVerifyToken } from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

userRouter.use(optionalVerifyToken);

userRouter.get('/:id/stats', userController.getProfileInformation);

userRouter.get('/:id/followers', userController.getFollowerUser);

userRouter.get('/:id/followings', userController.getFollowingUser);

userRouter.get('/:id/photos', userController.getUserPhoto);

userRouter.get('/:id/albums', userController.getUserAlbum);

export default userRouter;
