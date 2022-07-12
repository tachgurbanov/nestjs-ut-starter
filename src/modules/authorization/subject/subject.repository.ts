import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { ISubjectRepository } from './subject-repository.interface';
import { CreateSubjectDto, UpdateSubjectDto } from './dtos';

@Injectable()
export class SubjectRepository implements ISubjectRepository<Subject> {
  constructor(
    @Inject('SUBJECT_REPOSITORY')
    private subjectRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return await this.subjectRepository.save(
      this.subjectRepository.create(createSubjectDto),
    );
  }

  async delete(id: number): Promise<Subject> {
    return (await this.subjectRepository.delete(id)).raw[0];
  }

  async getAll(): Promise<Subject[]> {
    return await this.subjectRepository.find();
  }

  async getById(id: number): Promise<Subject> {
    return await this.subjectRepository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    return (await this.subjectRepository.update(id, updateSubjectDto)).raw[0];
  }
}
