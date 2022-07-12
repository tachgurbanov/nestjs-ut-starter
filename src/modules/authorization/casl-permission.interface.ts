import { PermissionActionEnum } from './types';

export interface CaslPermission {
  action: PermissionActionEnum;
  subject: string;
}
