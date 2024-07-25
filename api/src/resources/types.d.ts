import { type ZodError } from 'zod';
import { type DependenceKeys, type PositionKeys } from './enums';

type Position = PositionKeys.enginer | PositionKeys.counter | PositionKeys.secretary | PositionKeys.designer | PositionKeys.support | PositionKeys.publicist;

type Dependence = DependenceKeys.civilProtection | DependenceKeys.comunityManager | DependenceKeys.dgi | DependenceKeys.secretaryOfWorks | DependenceKeys.secretaryTransport;

export interface UserType {
  readonly _id: string;
  name: string;
  ci: number;
  delivered: boolean;
  date: Date;
  deliveredDate: Date;
  description: string;
  position: Position;
  dependence: Dependence;
}

export interface UserValidateGetFilter {
  success: boolean;
  error?: ZodError;
  data?: UserType[] | [];
}

type PartialUserType = Partial<Pick<UserType, 'name' | 'ci' | 'delivered'>>;

export interface UserParams extends PartialUserType {
  userCount?: number;
  date?: string;
}

export interface ObjFilterRequest {
  date?:
    | {
        $gte: Date;
        $lt: Date;
      }
    | undefined;
  delivered?: boolean | undefined;
  ci?: number | undefined;
  name?: RegExp | undefined;
}
