/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Query, Request } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CharactersQueryParams } from './dtos/characters-query-params.dto';
import { Comment } from './dtos/comment.dto';
import { Comments } from './dtos/comments.dto';
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
  @ApiOperation({summary: "Fetch a books characters list"})
  fetchBooksCharacterList(@Query() params: CharactersQueryParams, @Param ('bookID') bookID: number){
    return this.booksService.fetchBookCharacterList(params, bookID)
  }
  @Get('comments/:bookID')
  @ApiNotFoundResponse({schema:{
    title: "Resources not found",
  }})
  @ApiOperation({summary: "Fetch a Book's comments"})
  fetchBooksComments(@Param ('bookID') bookID: number){
     return this.booksService.fetchBooksComments(bookID)
  }
  @ApiOkResponse({type: Comments})
  @Post('comment/:bookID')
  @ApiOperation({ summary: "Add a comment to a book",})
  comment(@Param ('bookID') bookID: number, @Body() comment: Comment, @Request() req: any){
    return this.booksService.comment({bookID, req, comment})

  }

}
