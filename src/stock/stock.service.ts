import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';
import { Measure } from '../measures/entities/measure.entity';
import { Category } from '../categories/entities/category.entity';

// Relacion compra/venta, fecha de compra
// fecha actual cuanto se vendio y cuantos productos

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock)
    private stockModel: typeof Stock,
  ) {}

  async create(createStockDto: CreateStockDto): Promise<Stock> {
    try {
      const stock = await this.stockModel.create({ ...createStockDto });
      return stock;
    } catch (error: any) {
      console.log(error);
      console.log(error.code);
      throw new BadRequestException(`error: ${error.message}`);
    }
  }

  async findAll(): Promise<any[]> {
    const stocks = await this.stockModel.findAll({
      attributes: {
        exclude: ['category_id', 'measure_id', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Measure,
          as: 'measure',
          attributes: ['name'],
        },
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
    });

    const transformedStocks = stocks.map((stock) => ({
      id: stock.id,
      name: stock.name,
      quantity: stock.quantity,
      measure: stock.measure.name,
      category: stock.category.name,
    }));

    return transformedStocks;
  }

  async findOne(id: number): Promise<Stock> {
    try {
      const stock = await this.stockModel.findByPk(id);
      if (!stock) throw new NotFoundException(`ID ${id} was not found`);
      return stock;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async update(id: number, updateStockDto: UpdateStockDto): Promise<Stock> {
    try {
      const [rowsAffected, updatedStock] = await this.stockModel.update(
        { ...updateStockDto },
        {
          where: { id },
          returning: true,
        },
      );
      if (rowsAffected[0] === 0) {
        throw new NotFoundException(`Stock with id ${id} not found`);
      }

      return updatedStock[0];
    } catch (error) {
      console.log(error);
      throw new BadRequestException(`error: ${error.message}`);
    }
  }

  async remove(id: number) {
    const stock = await this.findOne(id);
    stock.destroy();
  }
}
