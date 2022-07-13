import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppAbilityType, RequiredPermissionType } from '../types';
import { PERMISSION_CHECKER_KEY } from '../decorators/check-permissions.decorator';
import { CaslAbilityFactory } from '../casl-ability.factory';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions =
      this.reflector.get<RequiredPermissionType[]>(
        PERMISSION_CHECKER_KEY,
        context.getHandler(),
      ) || [];

    const req = context.switchToHttp().getRequest();
    const account = req.account;

    if (account.superuser === 1) {
      return true;
    }

    const ability = await this.abilityFactory.createForAccount(account);

    return requiredPermissions.every((permission) =>
      PermissionsGuard.isAllowed(ability, permission),
    );
  }

  private static isAllowed(
    ability: AppAbilityType,
    permission: RequiredPermissionType,
  ): boolean {
    return ability.can(...permission);
  }
}
