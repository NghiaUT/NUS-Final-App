import express from 'express';
import authRouter from './auth.route.js';
// Route to imports

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
export default rootRouter;
