import { ApiProperty } from '@nestjs/swagger';
import { ListCollectionsOptions } from 'typeorm';

export class Character {
  @ApiProperty()
  status: number
  @ApiProperty()
  message: string
  @ApiProperty()
  bookId: number;
  @ApiProperty()
  charactersCount: number
  @ApiProperty()
  totalAge: number
  @ApiProperty()
  characters: ListCollectionsOptions
}
