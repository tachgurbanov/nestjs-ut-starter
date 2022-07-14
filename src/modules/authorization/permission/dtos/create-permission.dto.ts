import { IsEnum } from 'class-validator';
import { PermissionActionEnum } from '../../common/types';

export class CreatePermissionDto {
  @IsEnum(PermissionActionEnum)
  action: PermissionActionEnum;
}
