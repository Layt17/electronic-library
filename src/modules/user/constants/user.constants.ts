import { PaginateDataType } from 'src/internal/types/paginator';
import { User } from '../entity/user.entity';

export const sortPaginateData: PaginateDataType<User>[] = [
  'first_name',
  'last_name',
  'email',
  'id',
];

export const searchPaginateData: PaginateDataType<User>[] = [
  'roles.name',
  'first_name',
  'last_name',
  'email',
];
