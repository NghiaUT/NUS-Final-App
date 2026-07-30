import express from 'express';
import authRouter from './auth.route.js';
import healthRouter from './health.route.js';
import photoRouter from './photo.route.js';
import albumRouter from './album.route.js';
import userRouter from './user.route.js';
import adminRouter from './admin.route.js';
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
  res.status(401).json({ error: 'Đăng nhập thất bại' });
});
export default rootRouter;
