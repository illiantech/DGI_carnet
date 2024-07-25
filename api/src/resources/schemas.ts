import { z } from 'zod';
import { type UserValidateGetFilter } from './types';
import { DependenceKeys, PositionKeys } from './enums';
import mongoose from 'mongoose';

const userSchemaGetFilter = z.array(
  z.object({
    _id: z.instanceof(mongoose.Types.ObjectId),
    name: z.string({ invalid_type_error: 'no se encuentra nombre de usuario' }),
    ci: z.number().int().positive(),
    date: z.date(),
    deliveredDate: z.date(),
    delivered: z.boolean(),
    description: z.string(),
    position: z.union([
      z.literal(PositionKeys.counter),
      z.literal(PositionKeys.designer),
      z.literal(PositionKeys.enginer),
      z.literal(PositionKeys.publicist),
      z.literal(PositionKeys.secretary),
      z.literal(PositionKeys.support)
    ]),
    dependence: z.union([
      z.literal(DependenceKeys.civilProtection),
      z.literal(DependenceKeys.comunityManager),
      z.literal(DependenceKeys.dgi),
      z.literal(DependenceKeys.secretaryOfWorks),
      z.literal(DependenceKeys.secretaryTransport)
    ])
  })
);

export const validateUserSchemaGetFilter = <T>(data: T): UserValidateGetFilter => {
  return userSchemaGetFilter.safeParse(data) as UserValidateGetFilter;
};

// //

export const schemaPatchCheck = z.object({
  data: z.boolean(),
  id: z.string().readonly()
});

export const schemaPatchDescrip = z.object({
  data: z.string(),
  id: z.string().readonly()
});
