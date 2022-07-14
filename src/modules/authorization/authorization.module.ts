import { Global, Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { SubjectModule } from './subject/subject.module';
import { AccountModule } from '../user/account/account.module';
import { CaslAbilityFactory } from './casl-ability.factory';
import { PermissionsGuard } from './common/guards/permission.guard';

@Global()
@Module({
  imports: [RoleModule, PermissionModule, SubjectModule, AccountModule],
  providers: [CaslAbilityFactory, PermissionsGuard],
  exports: [
    RoleModule,
    PermissionModule,
    SubjectModule,
    CaslAbilityFactory,
    PermissionsGuard,
  ],
})
export class AuthorizationModule {}
