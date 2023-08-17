import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly description?: string;
}
