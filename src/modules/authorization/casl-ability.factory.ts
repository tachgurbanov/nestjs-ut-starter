import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../user/account/account.repository';
import { Account } from '../user/account/entities/account.entity';
import {
  AppAbilityType,
  PermissionActionEnum,
  PermissionObjectType,
} from './types';
import { Permission } from './permission/entities/permission.entity';
import { CaslPermission } from './casl-permission.interface';
import { Ability } from '@casl/ability';

@Injectable()
export class CaslAbilityFactory {
  constructor(private accountRepository: AccountRepository) {}

  async createForAccount(account: Account): Promise<AppAbilityType> {
    const dbPermissions: Permission[] =
      await this.accountRepository.getAllPermissions(account.id);
    const caslPermissions: CaslPermission[] = dbPermissions.map((p) => ({
      action: p.action,
      subject: p.subject.name,
    }));
    return new Ability<[PermissionActionEnum, PermissionObjectType]>(
      caslPermissions,
    );
  }
}
