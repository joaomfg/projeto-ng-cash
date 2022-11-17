import * as express from 'express';
import 'express-async-errors';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => res.send('Hello Word'));

export default app;
