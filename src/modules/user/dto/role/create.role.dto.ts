import { ApiProperty } from '@nestjs/swagger';
import { type } from 'os';
import { Permission } from '../../entity/permissions.entity';

export class CreateRoleDto {
  @ApiProperty()
  name: string;

  @ApiProperty({
    type: [Permission],
  })
  permissions: Permission[];
}
