/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Param, Post, Query, Request } from '@nestjs/common';
import { ApiConflictResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { BookNotFound } from './dtos/book-not-found.dto';
import { BookCharacters } from './dtos/book.characters.dto';
import { Books } from './dtos/books.dto';
import { CharactersNotFound } from './dtos/characters-not-found.dto';
import { CharactersQueryParams } from './dtos/characters-query-params.dto';
import { Comment } from './dtos/comment.dto';
import { Comments } from './dtos/comments.dto';
@ApiTags("Endpoints")
@Controller("api")
export class BooksController {
  constructor(private booksService: BooksService) {}
  @ApiNotFoundResponse({type: BookNotFound})
  @ApiOkResponse({type: Books})
  @Get('books')
  @HttpCode(200)
  @ApiOperation({summary:"Fetching Books from API and Syncing with the database"})
  fetchAllBooks(){
    return this.booksService.fetchAllBooks()
  }

  @ApiNotFoundResponse({type: CharactersNotFound})
  @ApiOkResponse({type: BookCharacters})
  @Get('book-characters/:bookID')
  @HttpCode(200)
  @ApiOperation({summary: "Fetch a books characters list"})
  fetchBooksCharacterList(@Query() params: CharactersQueryParams, @Param ('bookID') bookID: number){
    return this.booksService.fetchBookCharacterList(params, bookID)
  }

  @Get('comments/:bookID')
  @HttpCode(200)
  @ApiNotFoundResponse({schema:{
    title: "Resources not found",
  }})
  @ApiOperation({summary: "Fetch a Book's comments"})
  fetchBooksComments(@Param ('bookID') bookID: number){
     return this.booksService.fetchBooksComments(bookID)
  }
  @ApiOkResponse({type: Comments})
  @Post('comment/:bookID')
  @HttpCode(200)
  @ApiOperation({ summary: "Add a comment to a book",})
  comment(@Param ('bookID') bookID: number, @Body() comment: Comment, @Request() req: any){
    return this.booksService.comment({bookID, req, comment})

  }

}
