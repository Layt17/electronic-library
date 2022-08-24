import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entity/permissions.entity';
import {
  AltPaginated,
  PaginationDataProcceser,
} from '../../../internal/types/paginator';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}

  async getPermissionById(id: number): Promise<AltPaginated<Permission>> {
    const permission = await this.permissionRepo.findOneOrFail(id);

    return PaginationDataProcceser(permission);
  }

  async getAllPermissions(): Promise<AltPaginated<Permission[]>> {
    const permissions = await this.permissionRepo.find();

    return PaginationDataProcceser(permissions, 'permissions');
  }
}
