import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { permissionProviders } from './entities/permission.providers';
import { DatabaseModule } from '../../../database/database.module';
import { PermissionRepository } from './permission.repository';

@Module({
  imports: [DatabaseModule],
  providers: [...permissionProviders, PermissionRepository, PermissionService],
  controllers: [PermissionController],
  exports: [PermissionRepository, PermissionService],
})
export class PermissionModule {}
