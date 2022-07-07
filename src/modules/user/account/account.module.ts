import { DatabaseModule } from './../../../database/database.module';
import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { accountProviders } from './database/account.providers';
import { AccountRepository } from './database/account.repository';
import { AccountController } from './account.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...accountProviders, AccountRepository, AccountService],
  exports: [AccountRepository, AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
