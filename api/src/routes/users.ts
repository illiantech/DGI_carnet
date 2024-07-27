import { Router } from 'express';

import * as UserController from '../controllers/users';

export const usersRouter = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.get('/', UserController.getFilter);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.patch('/:id', UserController.patchDelivered, UserController.patchDescription);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.delete('/:id', UserController.deleteId);
