import { PaginateDataType } from 'src/internal/types/paginator';
import { Role } from '../entity/role.entity';

export const sortPaginateData: PaginateDataType<Role>[] = ['id', 'name'];

export const searchPaginateData: PaginateDataType<Role>[] = ['id', 'name'];
