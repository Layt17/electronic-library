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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getOneBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.getOneBook(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id/take')
  async take(@Req() req: Request, @Param('id') id: string) {
    return this.bookService.takeBook(+id, req.headers.authorization);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(['super-admin'])
  @Post('add')
  async addBook(@Body() bookDto: BookDto): Promise<Book> {
    return this.bookService.addBook(bookDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(['super-admin'])
  @Post('/give')
  async give(@Body() bookingDto: BookingDto) {
    return this.bookService.giveBook(
      bookingDto.book_name,
      bookingDto.user_email,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(['super-admin'])
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
