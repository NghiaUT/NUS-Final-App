import express from 'express';
import authRouter from './auth.route.js';
import healthRouter from './health.route.js';
import photoRouter from './photo.route.js';
import albumRouter from './album.route.js';
import userRouter from './user.route.js';
import adminRouter from './admin.route.js';
import { constant } from '../config/constant/constant.js';
// Route to imports

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/health', healthRouter);
rootRouter.use('/photos', photoRouter);
rootRouter.use('/albums', albumRouter);
rootRouter.use('/users', userRouter);
rootRouter.use('/admin', adminRouter);
// Specific route for social login
rootRouter.get('/login-failed', (req, res) => {
  const errorMessage = encodeURIComponent('Đăng nhập thất bại');
  res.redirect(`${constant.CLIENT_URL}/login?error=${errorMessage}`);
});
export default rootRouter;
