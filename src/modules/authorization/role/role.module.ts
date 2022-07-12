import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { roleProviders } from './entities/role.providers';
import { DatabaseModule } from '../../../database/database.module';
import { RoleRepository } from './role.repository';

@Module({
  imports: [DatabaseModule],
  providers: [...roleProviders, RoleRepository, RoleService],
  controllers: [RoleController],
  exports: [RoleRepository, RoleService],
})
export class RoleModule {}
