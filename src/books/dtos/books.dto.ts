import { ApiProperty, OpenAPIObject } from '@nestjs/swagger';
import { ObjectType } from 'typeorm';

export class Books {
  @ApiProperty()
  @ApiProperty()
  message: string;
  @ApiProperty()
  books: Array<OpenAPIObject>

}
