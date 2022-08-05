import { ApiProperty } from '@nestjs/swagger';

export class Character {
  @ApiProperty()
  character: {
    name: string;
  };
}
