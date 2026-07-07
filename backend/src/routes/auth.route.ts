import express from 'express';
import { authController } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/login', authController.login);
authRouter.post('/signup', authController.singup);
authRouter.post('/refresh-token', authController.getRefreshToken);
authRouter.get('/verify-email', authController.verifyUser);
authRouter.post('/reset-password', authController.resetPassword);
authRouter.post('/forgot-password', authController.forgotPassword);
authRouter.get('/me', verifyToken, authController.getMe);

export default authRouter;
