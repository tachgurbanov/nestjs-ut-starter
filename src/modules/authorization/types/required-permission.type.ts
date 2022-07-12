import { PermissionActionEnum } from './permission-action.enum';
import { PermissionObjectType } from './permission-object.type';

export type RequiredPermissionType = [
  PermissionActionEnum,
  PermissionObjectType,
];
