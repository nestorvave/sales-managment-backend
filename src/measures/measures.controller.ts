import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MeasuresService } from './measures.service';
import { CreateMeasureDto } from './dto/create-measure.dto';
import { UpdateMeasureDto } from './dto/update-measure.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Measures')
@Controller('measures')
export class MeasuresController {
  constructor(private readonly measuresService: MeasuresService) {}

  @Post()
  create(@Body() createMeasureDto: CreateMeasureDto) {
    return this.measuresService.create(createMeasureDto);
  }

  @Get()
  findAll() {
    return this.measuresService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.measuresService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMeasureDto: UpdateMeasureDto,
  ) {
    return this.measuresService.update(id, updateMeasureDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.measuresService.remove(id);
  }
}
