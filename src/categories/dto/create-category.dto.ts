import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNumber()
  id: number;
  @IsString()
  @MinLength(2)
  name: string;
  @IsString()
  @IsOptional()
  description?: string;
}
