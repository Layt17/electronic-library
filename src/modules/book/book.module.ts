import { Module } from '@nestjs/common';
import { BookService } from './service/book.service';
import { BookController } from './controller/book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { Booking } from './entity/booking.entity';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from 'src/internal/config/app.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Booking]),
    JwtModule.register({
      secret: AppConfig.jwtConfig.accessSecret,
      signOptions: {
        expiresIn: AppConfig.jwtConfig.expires_in_access,
      },
    }),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
