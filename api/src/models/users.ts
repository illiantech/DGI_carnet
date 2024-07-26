import { User } from '../conections/mongo';
import { objFilterRequest } from '../resources/mapping';
import { type UserType, type UserParams } from '../resources/types';

export const getFilterLazy = async ({ ci, name, delivered, date, userCount }: UserParams): Promise<UserType[] | null> => {
  if (ci === undefined && name === undefined && delivered === undefined && date === undefined) return null;

  return await User.find(objFilterRequest({ ci, name, delivered, date }))
    .skip(userCount ?? 0)
    .limit(5);
};

export const getFilterLenght = async ({ ci, name, delivered, date, userCount }: UserParams): Promise<number | null> => {
  if (userCount === 0) {
    return await User.find(objFilterRequest({ ci, name, delivered, date })).countDocuments();
  }

  return null;
};

export const patchCheck = async ({ id, data }: { id: string; data: true }): Promise<UserType | null> => {
  return await User.findByIdAndUpdate(id, { delivered: data, deliveredDate: new Date() }, { new: true });
};

export const patchDescrip = async ({ id, data }: { id: string; data: string }): Promise<UserType | null> => {
  return await User.findByIdAndUpdate(id, { description: data }, { new: true });
};

export const deleteId = async ({ id }: { id: string }): Promise<UserType | null> => {
  return await User.findByIdAndDelete(id);
};
