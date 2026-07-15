import express from 'express';
import { userController } from '../controllers/user.controller.js';
import { optionalVerifyToken } from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

userRouter.get(
  '/:id/profile',
  optionalVerifyToken,
  userController.getProfileInformation
);

export default userRouter;
