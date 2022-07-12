import { Inject, Injectable } from '@nestjs/common';
import { IPermissionRepository } from './permission-repository.interface';
import { CreatePermissionDto, UpdatePermissionDto } from './dtos';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionRepository implements IPermissionRepository<Permission> {
  constructor(
    @Inject('PERMISSION_REPOSITORY')
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    return await this.permissionRepository.save(
      this.permissionRepository.create(createPermissionDto),
    );
  }

  async delete(id: number): Promise<Permission> {
    return (await this.permissionRepository.delete(id)).raw[0];
  }

  async getAll(): Promise<Permission[]> {
    return await this.permissionRepository.find();
  }

  async getById(id: number): Promise<Permission> {
    return await this.permissionRepository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    return (await this.permissionRepository.update(id, updatePermissionDto))
      .raw[0];
  }
}
