import { ApiProperty } from '@nestjs/swagger';
export class BookCharacters {
  @ApiProperty()
  message: string;
  @ApiProperty()
  bookId: number;
  @ApiProperty()
  @ApiProperty()
  release_date: Date;
  @ApiProperty()
  authors: [string];
  @ApiProperty()
  charactersCount: number;
  @ApiProperty()
  totalAge: number;
  @ApiProperty()
  characters: [JSON];
}
