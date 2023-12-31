import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateProviderDto {
  @ApiProperty()
  @IsString()
  readonly name: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly description?: string;
}
