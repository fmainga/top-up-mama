import { ApiProperty } from '@nestjs/swagger';

export class Books {
  @ApiProperty()
  status: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  book_title: string;
}
