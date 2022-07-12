import { CreateSubjectDto, UpdateSubjectDto } from './dtos';

export interface ISubjectRepository<T> {
  create(createSubjectDto: CreateSubjectDto): Promise<T>;
  update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<T>;
  delete(id: number): Promise<T>;
  getById(id: number): Promise<T>;
  getAll(): Promise<T[]>;
}
