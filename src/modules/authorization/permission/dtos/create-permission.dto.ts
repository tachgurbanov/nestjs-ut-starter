import { IsEnum } from 'class-validator';
import { PermissionActionEnum } from '../../types';

export class CreatePermissionDto {
  @IsEnum(PermissionActionEnum)
  action: PermissionActionEnum;
}
