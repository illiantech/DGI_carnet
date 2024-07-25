import { Router } from 'express';
import * as UserModel from '../models/users';
import { regexParams } from '../resources/mapping';
import { schemaPatchCheck } from '../resources/schemas';

export const usersRouter = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.get('/', async (req, res) => {
  const { ci, name, date, delivered, userCount } = req.query;

  const filterParams = {
    ci: !regexParams.number.test(ci as string) || ci === undefined ? undefined : +ci,
    name: name === '' ? undefined : (name as string),
    delivered: !regexParams.delivered.test(delivered as string) ? undefined : Boolean(delivered),
    date: !regexParams.date.test(date as string) ? undefined : (date as string),
    userCount: !regexParams.number.test(userCount as string) || userCount === undefined ? 0 : +userCount
  };

  const result = await UserModel.getFilterLazy(filterParams);

  if (result.error != null) {
    return res.status(400).json(result.error);
  }

  const resultLenght = await UserModel.getFilterLenght(filterParams);

  return res.status(200).json([result.data, resultLenght]);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;

  const { data } = req.body;

  const validationCheck = schemaPatchCheck.safeParse({ id, data });

  // const validationDescrip = schemaPatchDescrip.safeParse({ id, data })

  if (validationCheck.error != null) {
    return res.status(400).json(validationCheck.error);
  }

    const result = await UserModel.patchCheck(validationCheck.data);

    console.log(result);
    return res.status(200).json(result);

});

usersRouter.delete('/', (_req, _res) => {});
