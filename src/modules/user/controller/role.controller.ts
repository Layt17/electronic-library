import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { AltPaginated } from 'src/internal/types/paginator';
import { CreateRoleDto } from '../dto/role/create.role.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../entity/role.entity';
import { RoleService } from '../service/role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<AltPaginated<Paginated<Role[]>>> {
    return await this.roleService.findAll(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getOneById(@Param('id') id: number): Promise<AltPaginated<Role>> {
    return await this.roleService.findRoleById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createNew(
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<AltPaginated<Role>> {
    return await this.roleService.createRole(createRoleDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRoleDto: CreateRoleDto,
  ): Promise<AltPaginated<Role>> {
    return await this.roleService.updateRole(id, updateRoleDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteById(@Param('id') id: number): Promise<AltPaginated<Role>> {
    return await this.roleService.deleteRoleById(id);
  }
}
