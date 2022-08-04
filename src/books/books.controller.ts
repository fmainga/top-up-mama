/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller("api")
export class BooksController {
  constructor(private booksService: BooksService) {}
  @Get('books')
  fetchAllBooks(@Request() req: any){
    return this.booksService.fetchAllBooks()
  }
  @Get('book-characters/:bookID')
  fetchBooksCharacterList(@Param ('bookID') bookID: number){
    return this.booksService.fetchBookCharacterList(bookID)
  }
  @Get('comments/:bookID')
  fetchBooksComments(@Param ('bookID') bookID: number){
     return this.booksService.fetchBooksComments(bookID)
  }
  @Post('comment/:bookID')
  comment(@Param ('bookID') bookID: number, @Body() comment: any, @Request() req: any){
    return this.booksService.comment({bookID, req, comment})

  }

}
