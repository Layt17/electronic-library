import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PermissionService } from '../service/permission.service';
import { AltPaginated } from 'src/internal/types/paginator';
import { Permission } from '../entity/permissions.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('permissions')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getById(@Param('id') id: number): Promise<AltPaginated<Permission>> {
    return await this.permissionService.getPermissionById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(): Promise<AltPaginated<Permission[]>> {
    return await this.permissionService.getAllPermissions();
  }
}
