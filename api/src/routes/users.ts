import { Router } from 'express';
import * as UserModel from '../models/users';
import { regexParams } from '../resources/mapping';
import { schemaPatchCheck, schemaPatchDescrip, userSchemaGetFilter } from '../resources/schemas';

export const usersRouter = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.get('/', async (req, res, next) => {
  const { ci, name, date, delivered, userCount } = req.query;

  const filterParams = {
    ci: !regexParams.number.test(ci as string) || ci === undefined ? undefined : +ci,
    name: name === '' ? undefined : (name as string),
    delivered: !regexParams.delivered.test(delivered as string) ? undefined : Boolean(delivered),
    date: !regexParams.date.test(date as string) ? undefined : (date as string),
    userCount: !regexParams.number.test(userCount as string) || userCount === undefined ? 0 : +userCount
  };

  const result = await UserModel.getFilterLazy(filterParams).catch(next);

  const validateResult = userSchemaGetFilter.safeParse(result);

  if (!validateResult.success) {
    return res.status(406).json(validateResult.error);
  }

  const resultLenght = await UserModel.getFilterLenght(filterParams).catch(next);

  return res.status(200).json([validateResult.data, resultLenght]);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.patch('/:id', async (req, res, next) => {
  const { id } = req.params;

  const { data } = req.body;

  const validateCheck = schemaPatchCheck.safeParse({ id, data });

  const validateDescrip = schemaPatchDescrip.safeParse({ id, data });

  if (validateCheck.success) {
    const result = await UserModel.patchCheck(validateCheck.data).catch(next);

    return result !== null ? res.status(200).json(result) : res.status(404).send({ error: 'Not found user pacth check id' });
  }

  if (validateDescrip.success) {
    const result = await UserModel.patchDescrip(validateDescrip.data).catch(next);

    return result !== null ? res.status(200).json(result) : res.status(404).send({ error: 'Not found user pacth descrip id' });
  }

  return res.status(406).json({ errorCheck: validateCheck.error, errorDescrip: validateDescrip.error });
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  const result = await UserModel.deleteId({ id }).catch(next);

  return result !== null ? res.status(200).json(result) : res.status(404).send({ error: 'Not found user delete id' });
});
