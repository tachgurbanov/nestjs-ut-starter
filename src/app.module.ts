import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
})
export class AppModule {}
