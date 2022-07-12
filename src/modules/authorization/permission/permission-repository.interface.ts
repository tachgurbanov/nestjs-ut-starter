import { CreatePermissionDto, UpdatePermissionDto } from './dtos';

export interface IPermissionRepository<T> {
  create(createPermissionDto: CreatePermissionDto): Promise<T>;
  update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<T>;
  delete(id: number): Promise<T>;
  getById(id: number): Promise<T>;
  getAll(): Promise<T[]>;
}
