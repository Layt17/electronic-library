import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookDto } from '../dto/book.dto';
import { Book } from '../entity/book.entity';
import { Booking } from '../entity/booking.entity';

@Injectable()
export class BookService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async getOneBook(id: number) {
    return this.bookRepository.findOne(id);
  }

  async getOneByName(book_name: string): Promise<Book> {
    const book = await this.bookRepository
      .createQueryBuilder('books')
      .where('books.name like :name', { name: `%${book_name}%` })
      .getOne();
    if (!book) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
    return book;
  }

  async getByAuthor(author: string): Promise<Book[]> {
    const books = await this.bookRepository
      .createQueryBuilder('books')
      .where('books.author like :author', { author: `%${author}%` })
      .getMany();
    if (!books) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
    return books;
  }

  async getByGenre(genre: string): Promise<Book[]> {
    const books = await this.bookRepository
      .createQueryBuilder('books')
      .where('books.name like :genre', { genre: `%${genre}%` })
      .getMany();
    if (!books) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
    return books;
  }

  async giveBook(book_name: string, user_email: string) {
    const book = await this.getOneByName(book_name);
    if (book.current_user) {
      throw new HttpException(
        'this book is already taken',
        HttpStatus.CONFLICT,
      );
    }
    book.current_user = user_email;
    return await this.bookRepository.save(book);
  }

  async addBook(bookDto: BookDto) {
    return await this.bookRepository.save(bookDto);
  }

  async takeBook(book_id: number, accessToken: string): Promise<Booking> {
    accessToken = accessToken.replace('Bearer ', '');
    const userDataFromToken = await this.jwtService.verify(accessToken, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
    const book = await this.bookRepository.findOne(book_id);
    if (book.current_user) {
      throw new HttpException(
        'this book is already taken',
        HttpStatus.CONFLICT,
      );
    }
    const booking = {
      book_name: book.name,
      user_name: userDataFromToken.email,
    };
    return await this.bookingRepository.save(booking);
  }

  async remove(id: number): Promise<void> {
    this.bookRepository.delete(id);
  }
}
