import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PermissionService } from '../service/permission.service';
import { AltPaginated } from 'src/internal/types/paginator';
import { Permission } from '../entity/permissions.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('permissions')
@Controller('permissions')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOkResponse({
    type: Permission,
    description: 'Get a permission by id',
  })
  async getById(@Param('id') id: number): Promise<AltPaginated<Permission>> {
    return await this.permissionService.getPermissionById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({
    type: [Permission],
    description: 'Get all permissions',
  })
  async getAll(): Promise<AltPaginated<Permission[]>> {
    return await this.permissionService.getAllPermissions();
  }
}
