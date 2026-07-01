import express from 'express';
import { authController } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/login', authController.login);
authRouter.post('/signup', authController.singup);

export default authRouter;
