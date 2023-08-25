import { ApiProperty } from '@nestjs/swagger';
import {
  IsBase64,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsBase64()
  readonly image?: string;
}
