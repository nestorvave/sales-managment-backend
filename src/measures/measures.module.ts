import { Module } from '@nestjs/common';
import { MeasuresService } from './measures.service';
import { MeasuresController } from './measures.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Measure } from './entities/measure.entity';

@Module({
  imports: [SequelizeModule.forFeature([Measure])],
  controllers: [MeasuresController],
  providers: [MeasuresService],
})
export class MeasuresModule {}
