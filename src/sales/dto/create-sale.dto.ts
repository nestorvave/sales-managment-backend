import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Min, IsArray, IsNotEmptyObject, IsIn, ArrayContains, ArrayNotEmpty, ValidateNested } from 'class-validator';

class SaleItemDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  price: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  product_id: number;
}

export class CreateSaleDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({ type: [SaleItemDto] })
  @ValidateNested({ each: true })
  @Type(() => SaleItemDto)
  details: SaleItemDto[];
}

