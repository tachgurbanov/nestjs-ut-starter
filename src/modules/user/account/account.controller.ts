import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { IAccountRepository } from './database/account-repository.interface';
import { Account } from './database/account.entity';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';

@Controller('account')
export class AccountController implements IAccountRepository<Account> {
  constructor(private accountService: AccountService) {}

  @Post('')
  async create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return await this.accountService.create(createAccountDto);
  }

  @Patch(':id')
  async update(
    @Param() id: number,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    return await this.accountService.update(id, updateAccountDto);
  }

  @Delete(':id')
  async delete(@Param() id: number): Promise<Account> {
    return await this.accountService.delete(id);
  }

  @Get(':id')
  async getById(@Param() id: number): Promise<Account> {
    return await this.accountService.getById(id);
  }

  @Get('')
  async getAll(): Promise<Account[]> {
    return await this.accountService.getAll();
  }
}
