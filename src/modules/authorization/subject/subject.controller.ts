import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSubjectDto, UpdateSubjectDto } from './dtos';
import { Subject } from './entities/subject.entity';
import { SubjectRepository } from './subject.repository';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return await this.subjectRepository.create(createSubjectDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Subject> {
    return await this.subjectRepository.delete(+id);
  }

  @Get()
  async getAll(): Promise<Subject[]> {
    return await this.subjectRepository.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Subject> {
    return await this.subjectRepository.getById(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    return await this.subjectRepository.update(+id, updateSubjectDto);
  }
}
