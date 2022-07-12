import { Inject, Injectable } from '@nestjs/common';
import { IRoleRepository } from './role-repository.interface';
import { Role } from './entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from './dtos';
import { Repository } from 'typeorm';

@Injectable()
export class RoleRepository implements IRoleRepository<Role> {
  constructor(
    @Inject('ROLE_REPOSITORY') private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.save(
      this.roleRepository.create(createRoleDto),
    );
  }

  async delete(id: number): Promise<Role> {
    return (await this.roleRepository.delete(id)).raw[0];
  }

  async getAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async getById(id: number): Promise<Role> {
    return await this.roleRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    return (await this.roleRepository.update(id, updateRoleDto)).raw[0];
  }
}
