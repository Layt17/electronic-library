import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { AltPaginated } from 'src/internal/types/paginator';
import { CreateRoleDto } from '../dto/role/create.role.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../entity/role.entity';
import { RoleService } from '../service/role.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({
    type: [Role],
    description: 'Get all roles',
  })
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<AltPaginated<Paginated<Role[]>>> {
    return await this.roleService.findAll(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOkResponse({
    type: Role,
    description: 'Get a role by id',
  })
  async getOneById(@Param('id') id: number): Promise<AltPaginated<Role>> {
    return await this.roleService.findRoleById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOkResponse({
    type: Role,
    description: 'Create a role',
  })
  async createNew(
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<AltPaginated<Role>> {
    return await this.roleService.createRole(createRoleDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiNotFoundResponse({
    description: 'Delete role by id',
  })
  async deleteById(@Param('id') id: number): Promise<AltPaginated<Role>> {
    return await this.roleService.deleteRoleById(id);
  }
}
