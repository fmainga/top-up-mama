/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Query, Request } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CharactersQueryParams } from './dtos/characters-query-params.dto';
@ApiTags("Endpoints")
@Controller("api")
export class BooksController {
  constructor(private booksService: BooksService) {}
  @Get('books')
  @ApiOperation({summary:"Fetching Books from API and Syncing with the database"})
  @ApiResponse({ status: 201, description: 'Resources Found' })
  fetchAllBooks(){
    return this.booksService.fetchAllBooks()
  }
  @Get('book-characters/:bookID')
  fetchBooksCharacterList(@Query() params: CharactersQueryParams, @Param ('bookID') bookID: number){
    return this.booksService.fetchBookCharacterList(params, bookID)
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
