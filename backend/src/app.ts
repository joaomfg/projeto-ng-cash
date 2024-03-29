import * as express from 'express';
import * as cors from 'cors';
import 'express-async-errors';
import errorHandler from './middlewares/errorHandler';
import userRouter from './routes/userRouter';
import transactionRouter from './routes/transactionRouter';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (_req, res) => res.send('Hello Word'));

app.use('/login', userRouter);

app.use('/transaction', transactionRouter);

app.use(errorHandler);

export default app;
