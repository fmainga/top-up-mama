import { ApiProperty } from '@nestjs/swagger';

export class Comments {
  @ApiProperty()
  book_id: string;
  @ApiProperty()
  book_name: string;
  @ApiProperty()
  release_date: Date;
  @ApiProperty()
  authors: [];
  @ApiProperty()
  comments: [];
}

// "id": "1",
// "book_id": "1",
// "book_name": "A Game of Thrones",
// "release_date": "1996-08-01",
// "authors": [
//   "George R. R. Martin"
// ],
// "created_at": "2022-08-05T04:39:17.201Z",
