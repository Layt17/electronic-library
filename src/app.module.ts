import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import * as Dotenv from 'dotenv';
import { AppConfig } from './internal/config/app.config';

Dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({ type: 'mysql', ...AppConfig.typeOrmConfig }),
    UserModule,
    AuthModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
