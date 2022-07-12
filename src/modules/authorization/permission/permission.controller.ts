import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePermissionDto, UpdatePermissionDto } from './dtos';
import { Permission } from './entities/permission.entity';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  async create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    return await this.permissionService.create(createPermissionDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Permission> {
    return await this.permissionService.delete(+id);
  }

  @Get()
  async getAll(): Promise<Permission[]> {
    return await this.permissionService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Permission> {
    return await this.permissionService.getById(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    return await this.permissionService.update(+id, updatePermissionDto);
  }
}
