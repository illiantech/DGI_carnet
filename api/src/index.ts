import express from 'express';
import { usersRouter } from './routes/users';
import * as mid from './resources/middleware';
import cors from 'cors';

// port
// separation concepts
// mongoDB atlas
// .env sensitive info
// despliegue

const app = express();
const port = 3101;

app.use(cors(mid.corsOptions));
app.use(express.json());
app.disable('x-powered-by');

app.use('/users', usersRouter);

app.use(mid.notFound);

app.use(mid.errorServer);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
