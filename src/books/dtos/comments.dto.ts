import { ApiProperty } from '@nestjs/swagger';

export class Comments {
  @ApiProperty()
  book_id: number;
  @ApiProperty()
  comment: string
}
