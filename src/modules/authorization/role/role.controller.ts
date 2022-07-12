import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from './dtos';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleService.create(createRoleDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Role> {
    return await this.roleService.delete(+id);
  }

  @Get()
  async getAll(): Promise<Role[]> {
    return await this.roleService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Role> {
    return await this.roleService.getById(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    return this.roleService.update(+id, updateRoleDto);
  }
}
