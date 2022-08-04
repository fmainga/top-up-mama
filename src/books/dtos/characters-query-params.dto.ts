/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CharactersQueryParams {
  @ApiPropertyOptional()
  sort: string;
  // eslint-disable-next-line prettier/prettier
  @ApiPropertyOptional()
  order: string;
  @ApiPropertyOptional()
  gender: string
}
