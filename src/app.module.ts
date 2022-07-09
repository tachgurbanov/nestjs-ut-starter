import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule],
})
export class AppModule {}
