import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dtos';
import { UpdateAccountDto } from './dtos';

@Controller('account')
@UseInterceptors(ClassSerializerInterceptor)
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('')
  async create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return await this.accountService.create(createAccountDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    return new Account(await this.accountService.update(+id, updateAccountDto));
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Account> {
    return await this.accountService.delete(+id);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Account> {
    return await this.accountService.getById(+id);
  }

  @Get('')
  async getAll(): Promise<Account[]> {
    return await this.accountService.getAll();
  }
}
