import { type CorsOptions } from 'cors';
import { type Controllers, type ControllersError } from './types';

export const notFound: Controllers = async (_req, res) => {
  return res.status(404)
    .send(`<article style="display: flex; flex-direction: column; width: 100vw; height: 100vh; justify-content: center; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">
        <h1 style="font-size: 6rem; text-align: center;"><mark style="color: white; background-color: hsl(0, 100%, 35%); padding: 0px 10px; border-radius: 5px;">404</mark> Not Found</h1>
        <p style="text-align: center; font-size: 2rem;"><strong>The route dont correspond to this api</strong></p>
      </article>`);
};

export const errorServer: ControllersError = (err, _req, res) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'id used is malformed' });
  } else return res.status(500).send({ error: 'Server error' });
};

const acceptsOrigins = [process.env.ROOT_DEV ?? '', process.env.ROOT_PREV ?? '', 'https://illiantech.github.io'];
export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (acceptsOrigins.includes(origin as unknown as string) || origin === undefined) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
