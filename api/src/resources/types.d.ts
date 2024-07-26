import { type DependenceKeys, type PositionKeys } from './enums';
import { type Document } from 'mongoose';

type Position =
  | PositionKeys.enginer
  | PositionKeys.counter
  | PositionKeys.secretary
  | PositionKeys.designer
  | PositionKeys.support
  | PositionKeys.publicist;

type Dependence =
  | DependenceKeys.civilProtection
  | DependenceKeys.comunityManager
  | DependenceKeys.dgi
  | DependenceKeys.secretaryOfWorks
  | DependenceKeys.secretaryTransport;

export interface UserType extends Document {
  readonly _id: string;
  name: string;
  ci: number;
  delivered: boolean;
  date: Date;
  deliveredDate?: Date;
  description?: string;
  position: Position;
  dependence: Dependence;
}

type PartialUserType = Partial<Pick<UserType, 'name' | 'ci' | 'delivered'>>;

export interface UserParams extends PartialUserType {
  userCount?: number;
  date?: string;
}

export interface ObjFilterRequest extends PartialUserType {
  date?: {
    $gte: Date;
    $lt: Date;
  };
  name?: RegExp;
}
