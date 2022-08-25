import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { BookService } from '../service/book.service';
import { BookDto } from '../dto/book.dto';
import { Book } from '../entity/book.entity';
import { BookingDto } from '../dto/booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/modules/auth/roles.decorator';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Booking } from '../entity/booking.entity';

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOkResponse({
    type: Book,
    description: 'Get a book by id',
  })
  async getOneBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.getOneBook(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id/take')
  @ApiOkResponse({
    type: Book,
    description: 'Book a book',
  })
  async take(@Req() req: Request, @Param('id') id: string): Promise<Booking> {
    return this.bookService.takeBook(+id, req.headers.authorization);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(['super-admin'])
  @Post('add')
  @ApiOkResponse({
    type: Book,
    description: 'Add a book',
  })
  async addBook(@Body() bookDto: BookDto): Promise<Book> {
    return this.bookService.addBook(bookDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(['super-admin'])
  @Post('/give')
  @ApiOkResponse({
    type: Book,
    description: 'Book a book',
  })
  async give(@Body() bookingDto: BookingDto): Promise<Book> {
    return this.bookService.giveBook(
      bookingDto.book_name,
      bookingDto.user_email,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(['super-admin'])
  @Delete(':id')
  @ApiNotFoundResponse({
    description: 'Delete a book by id',
  })
  async delete(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
