import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stock } from './entities/stock.entity';

@Module({
  imports: [SequelizeModule.forFeature([Stock])],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
