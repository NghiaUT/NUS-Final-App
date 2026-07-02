import express from 'express';
import authRouter from './auth.route.js';
import healthRouter from './health.route.js';
// Route to imports

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/health', healthRouter);
export default rootRouter;
