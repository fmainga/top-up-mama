/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CharactersQueryParams {
  @ApiPropertyOptional()
  sortBy: string;
  // eslint-disable-next-line prettier/prettier
  @ApiPropertyOptional()
  order: string;
  @ApiPropertyOptional()
  filterByGender: string
}
