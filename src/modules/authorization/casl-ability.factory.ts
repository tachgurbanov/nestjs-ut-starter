import { Injectable } from '@nestjs/common';
import {
  AppAbilityType,
  PermissionActionEnum,
  PermissionObjectType,
} from './common/types';
import { Permission } from './permission/entities/permission.entity';
import { CaslPermission } from './casl-permission.interface';
import { Ability } from '@casl/ability';

@Injectable()
export class CaslAbilityFactory {
  async createForAccount(permissions: Permission[]): Promise<AppAbilityType> {
    const caslPermissions: CaslPermission[] = permissions.map((p) => ({
      action: p.action,
      subject: p.subject.name,
    }));
    return new Ability<[PermissionActionEnum, PermissionObjectType]>(
      caslPermissions,
    );
  }
}
