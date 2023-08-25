import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateStockDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  readonly quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @IsPositive()
  readonly category_id?: number;
  
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly measure_id: number;
}
