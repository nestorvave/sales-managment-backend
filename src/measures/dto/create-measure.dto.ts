import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateMeasureDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  readonly name: string;
}
