import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../entity/role.entity';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  birth: string;

  @ApiProperty()
  passport: string;

  @ApiProperty()
  password: string;
}

export class ShowUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  birth: string;

  @ApiProperty({
    type: [Role],
  })
  roles: Role[];
}
