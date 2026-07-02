import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import rootRouter from './src/routes/index.js';
import { errorHandler } from './src/middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

const port = 3000;
const app = express();

// Allow frontend domain:
app.use(
  cors({
    origin: 'localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.send('App is running smoothly!');
});

app.use('/api', rootRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
