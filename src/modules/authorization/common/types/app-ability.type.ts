import { Ability } from '@casl/ability';
import { PermissionActionEnum } from './permission-action.enum';
import { PermissionObjectType } from './permission-object.type';

export type AppAbilityType = Ability<
  [PermissionActionEnum, PermissionObjectType]
>;
