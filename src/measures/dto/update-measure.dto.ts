import { PartialType } from '@nestjs/swagger';
import { CreateMeasureDto } from './create-measure.dto';

export class UpdateMeasureDto extends PartialType(CreateMeasureDto) {}
