import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { DatabaseModule } from '../../../database/database.module';
import { subjectProviders } from './entities/subject.providers';
import { SubjectRepository } from './subject.repository';

@Module({
  imports: [DatabaseModule],
  providers: [...subjectProviders, SubjectRepository, SubjectService],
  controllers: [SubjectController],
  exports: [SubjectRepository, SubjectService],
})
export class SubjectModule {}
