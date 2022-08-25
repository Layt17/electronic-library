import { ApiProperty } from '@nestjs/swagger';

export class RegistrationDto {
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

export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
