import { Injectable } from '@nestjs/common';
import { IPermissionRepository } from './permission-repository.interface';
import { CreatePermissionDto, UpdatePermissionDto } from './dtos';
import { Permission } from './entities/permission.entity';
import { PermissionRepository } from './permission.repository';

@Injectable()
export class PermissionService implements IPermissionRepository<Permission> {
  constructor(private permissionRepository: PermissionRepository) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    return await this.permissionRepository.create(createPermissionDto);
  }

  async delete(id: number): Promise<Permission> {
    return await this.permissionRepository.delete(id);
  }

  async getAll(): Promise<Permission[]> {
    return await this.permissionRepository.getAll();
  }

  async getById(id: number): Promise<Permission> {
    return await this.permissionRepository.getById(id);
  }

  async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    return await this.permissionRepository.update(id, updatePermissionDto);
  }
}
