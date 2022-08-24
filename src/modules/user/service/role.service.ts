import { ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import {
  AltPaginated,
  PaginationDataProcceser,
} from 'src/internal/types/paginator';
import { Repository } from 'typeorm';
import {
  searchPaginateData,
  sortPaginateData,
} from '../constants/role.constants';
import { CreateRoleDto } from '../dto/role/create.role.dto';
import { Role } from '../entity/role.entity';

export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<AltPaginated<Role>> {
    try {
      const permissions = createRoleDto.permissions;
      const data = await this.roleRepo.save(
        new Role(createRoleDto.name, permissions),
      );

      return PaginationDataProcceser(data);
    } catch (e: any) {
      throw new ConflictException(e.message);
    }
  }

  async findAll(
    query: PaginateQuery,
  ): Promise<AltPaginated<Paginated<Role[]>>> {
    const data = await paginate(query, this.roleRepo, {
      sortableColumns: sortPaginateData,
      searchableColumns: searchPaginateData,
      relations: ['permissions'],
      defaultSortBy: [['id', 'DESC']],
    });

    return PaginationDataProcceser(data, 'roles');
  }

  async findRoleByName(name: string): Promise<AltPaginated<Role>> {
    const data = await this.roleRepo.findOne(
      { name: name },
      {
        relations: ['permissions'],
      },
    );

    return PaginationDataProcceser(data);
  }

  async findRoleById(id: number): Promise<AltPaginated<Role>> {
    const data = await this.roleRepo.findOneOrFail(id, {
      relations: ['permissions'],
    });

    return PaginationDataProcceser(data);
  }

  async updateRole(
    id: number,
    updateRoleDto: CreateRoleDto,
  ): Promise<AltPaginated<Role>> {
    const oldRole = await this.findRoleById(id);

    oldRole.data.name = updateRoleDto.name;
    oldRole.data.permissions = updateRoleDto.permissions;

    const updateRole = await this.roleRepo.save(oldRole.data);

    return PaginationDataProcceser(updateRole);
  }

  async deleteRoleById(id: number): Promise<AltPaginated<Role>> {
    const role = await this.findRoleById(id);
    await this.roleRepo.delete(id);

    return role;
  }
}
