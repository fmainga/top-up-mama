import { ApiProperty } from '@nestjs/swagger';

export class CharactersNotFound {
  @ApiProperty()
  status: number;
  @ApiProperty()
  message: string;
}
