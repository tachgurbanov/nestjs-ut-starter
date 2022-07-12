import { CreateRoleDto, UpdateRoleDto } from './dtos';

export interface IRoleRepository<T> {
  create(createRoleDto: CreateRoleDto): Promise<T>;
  update(id: number, updateRoleDto: UpdateRoleDto): Promise<T>;
  delete(id: number): Promise<T>;
  getById(id: number): Promise<T>;
  getAll(): Promise<T[]>;
}
