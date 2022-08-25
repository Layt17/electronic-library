import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '../../entity/permissions.entity';

export class CreateRoleDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  permissions: Permission[];
}
