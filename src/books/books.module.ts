/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from 'src/database/models/book.entity';
import { Characters } from 'src/database/models/character.entity';
import { Comments } from 'src/database/models/comment.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Books, Comments, Characters]),
  ],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
