import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class BookingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  book_name: string;

  @ApiProperty()
  @IsEmail()
  user_email: string;
}
