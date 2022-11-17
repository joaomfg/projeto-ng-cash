import * as express from 'express';
import * as cors from 'cors';
import 'express-async-errors';
import errorHandler from './middlewares/errorHandler';
import userRouter from './routes/userRouter';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (_req, res) => res.send('Hello Word'));

app.use('/login', userRouter);

app.use(errorHandler);

export default app;
