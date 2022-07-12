import { Injectable } from '@nestjs/common';
import { IRoleRepository } from './role-repository.interface';
import { CreateRoleDto, UpdateRoleDto } from './dtos';
import { Role } from './entities/role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService implements IRoleRepository<Role> {
  constructor(private roleRepository: RoleRepository) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.create(createRoleDto);
  }

  async delete(id: number): Promise<Role> {
    return await this.roleRepository.delete(id);
  }

  async getAll(): Promise<Role[]> {
    return await this.roleRepository.getAll();
  }

  async getById(id: number): Promise<Role> {
    return await this.roleRepository.getById(id);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    return await this.roleRepository.update(id, updateRoleDto);
  }
}
