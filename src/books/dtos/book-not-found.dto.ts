import { ApiProperty } from '@nestjs/swagger';

export class BookNotFound {
  @ApiProperty()
  status: number;
  @ApiProperty()
  message: string;
}
