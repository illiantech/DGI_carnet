import { User } from '../conections/mongo';
import { objFilterRequest } from '../resources/mapping';
import { validateUserSchemaGetFilter } from '../resources/schemas';
import { type UserParams, type UserValidateGetFilter } from '../resources/types';

export const getFilterLazy = async ({ ci, name, delivered, date, userCount }: UserParams): Promise<UserValidateGetFilter> => {
  if (ci === undefined && name === undefined && delivered === undefined && date === undefined) return validateUserSchemaGetFilter(undefined);

  const response = await User.find(objFilterRequest({ ci, name, delivered, date }))
    .skip(userCount ?? 0)
    .limit(5);

  const result = validateUserSchemaGetFilter(response);

  return result;
};

export const getFilterLenght = async ({ ci, name, delivered, date, userCount }: UserParams): Promise<number | undefined> => {
  if (userCount === 0) {
    return await User.find(objFilterRequest({ ci, name, delivered, date })).countDocuments();
  }

  return undefined;
};

export const patchCheck = async ({ id, data }: { id: string; data: boolean }): Promise<any> => {
  return { id, data };
};
