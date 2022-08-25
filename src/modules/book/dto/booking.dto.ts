import { ApiProperty } from '@nestjs/swagger';

export class BookingDto {
  @ApiProperty()
  book_name: string;

  @ApiProperty()
  user_email: string;
}
