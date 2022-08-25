import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  genre?: string;

  @ApiProperty()
  current_user?: string;
}
