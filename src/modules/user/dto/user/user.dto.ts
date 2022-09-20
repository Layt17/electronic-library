import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../entity/role.entity';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  birth: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  passport: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
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
