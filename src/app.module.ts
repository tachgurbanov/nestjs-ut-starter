import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AccountModule } from './modules/user/account/account.module';
import { ProfileModule } from './modules/user/profile/profile.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, AccountModule, ProfileModule],
})
export class AppModule {}
