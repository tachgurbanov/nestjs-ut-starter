import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { RequiredPermissionType } from '../types';

export const PERMISSION_CHECKER_KEY = 'permission_checker_params_key';
export const CheckPermissions = (
  ...params: RequiredPermissionType[]
): CustomDecorator<string> => SetMetadata(PERMISSION_CHECKER_KEY, params);
