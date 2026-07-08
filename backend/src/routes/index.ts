import express from 'express';
import authRouter from './auth.route.js';
import healthRouter from './health.route.js';
import photoRouter from './photo.route.js';
import albumRouter from './album.route.js';
// Route to imports

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/health', healthRouter);
rootRouter.use('/photos', photoRouter);
rootRouter.use('/albums', albumRouter);
export default rootRouter;
