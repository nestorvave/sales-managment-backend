import { Module } from '@nestjs/common';

import { SalesDetailsController } from './sales_details.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SalesDetail } from './entities/sales_detail.entity';


@Module({
  imports: [SequelizeModule.forFeature([SalesDetail])],
  controllers: [],
  providers: [],
  exports: [SequelizeModule.forFeature([SalesDetail])],
})
export class SalesDetailsModule {}
