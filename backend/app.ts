import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import rootRouter from './src/routes/index.js';
import { errorHandler } from './src/middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import { constant } from './src/config/constant/constant.js';
import './src/config/redis/redis.config.js';
import './src/config/queue/email.queue.js';
import path from 'path';

const port = 3000;
const app = express();

// Allow frontend domain:
app.use(
  cors({
    origin: `${constant.CLIENT_URL}`,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.send('App is running smoothly!');
});

// Sử dụng để serve file static (lấy từ folder upload)
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

app.use('/api', rootRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
