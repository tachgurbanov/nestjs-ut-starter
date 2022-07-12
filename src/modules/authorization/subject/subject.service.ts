import { Injectable } from '@nestjs/common';
import { ISubjectRepository } from './subject-repository.interface';
import { CreateSubjectDto, UpdateSubjectDto } from './dtos';
import { Subject } from './entities/subject.entity';
import { SubjectRepository } from './subject.repository';

@Injectable()
export class SubjectService implements ISubjectRepository<Subject> {
  constructor(private subjectRepository: SubjectRepository) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return await this.subjectRepository.create(createSubjectDto);
  }

  async delete(id: number): Promise<Subject> {
    return await this.subjectRepository.delete(id);
  }

  async getAll(): Promise<Subject[]> {
    return await this.subjectRepository.getAll();
  }

  async getById(id: number): Promise<Subject> {
    return await this.subjectRepository.getById(id);
  }

  async update(
    id: number,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    return await this.subjectRepository.update(id, updateSubjectDto);
  }
}
