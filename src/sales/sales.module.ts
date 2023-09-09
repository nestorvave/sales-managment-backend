import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sale } from './entities/sale.entity';
import { SalesDetailsModule } from 'src/sales_details/sales_details.module';


@Module({
  imports: [SequelizeModule.forFeature([Sale]), SalesDetailsModule],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
