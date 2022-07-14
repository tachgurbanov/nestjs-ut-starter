import { PermissionActionEnum } from './common/types';

export interface CaslPermission {
  action: PermissionActionEnum;
  subject: string;
}
