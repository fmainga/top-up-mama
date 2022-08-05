import { ApiProperty } from '@nestjs/swagger';

export class Comments {
  @ApiProperty()
  status: number
  @ApiProperty()
  message: string
  @ApiProperty()
  book_id: number;
  @ApiProperty()
  comment: string
}
