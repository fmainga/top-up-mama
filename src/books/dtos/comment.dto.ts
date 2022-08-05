/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class Comment {
    @ApiProperty()
    comment: string
}