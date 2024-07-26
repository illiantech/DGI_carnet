import { type UserParams, type ObjFilterRequest } from './types';

const dateMaxFormatted = (date: string): Date => {
  if (+date.slice(5, 7) === 12) return new Date(`${+date.slice(0, 4) + 1}-01-01`);
  else {
    return new Date(`${date.slice(0, 4)}-0${+date.slice(5, 7) + 1}-01`);
  }
};

export const regexParams = {
  number: /^\d+$/,
  delivered: /^true$/,
  date: /^\d{4}-\d{2}(-\d{2})?$/
};

export const objFilterRequest = ({ ci, name, delivered, date }: UserParams): ObjFilterRequest => {
  return {
    ...(name !== undefined ? { name: new RegExp(`${name}`, 'gmi') } : {}),
    ...(ci !== undefined ? { ci } : {}),
    ...(delivered !== undefined ? { delivered } : {}),
    ...(date !== undefined
      ? {
          date: {
            $gte: new Date(date),
            $lt: dateMaxFormatted(date)
          }
        }
      : {})
  };
};
