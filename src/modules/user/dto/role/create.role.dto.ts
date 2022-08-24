import { Permission } from '../../entity/permissions.entity';

export class CreateRoleDto {
  name: string;

  permissions: Permission[];
}
