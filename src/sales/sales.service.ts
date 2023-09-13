import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Sale } from './entities/sale.entity';
import { SalesDetail } from 'src/sales_details/entities/sales_detail.entity';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
@Injectable()
export class SalesService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(Sale) private saleModel: typeof Sale,
    @InjectModel(SalesDetail) private saleDetailModel: typeof SalesDetail,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const { amount, details } = createSaleDto;
    let transaction: Transaction;

    try {
      transaction = await this.sequelize.transaction();

      const newSale = await this.saleModel.create({ amount }, { transaction });
      const saleDetailItems = details.map((item) => ({
        quantity: item.quantity,
        price: item.price,
        product_id: item.product_id,
        sales_id: newSale.id,
      }));

      await this.saleDetailModel.bulkCreate(saleDetailItems, { transaction });

      await transaction.commit();
      return newSale;
    } catch (err) {
      if (transaction) {
        await transaction.rollback();
      }
      if (err.name === 'SequelizeForeignKeyConstraintError') {
        throw new BadRequestException(
          'Can not create a sale because product does not exist',
        );
      } else {
        throw new InternalServerErrorException(
          'Error has occurred during transaction',
        );
      }
    }
  }
  async findAll(): Promise<Sale[]> {
    const sales = await this.saleModel.findAll({
      attributes: {
        exclude: ['updatedAt'],
      },
      include: [
        {
          model: SalesDetail,
          as: 'details',
          attributes: ['quantity', 'price', 'product_id'],
        },
      ],
    });
    return sales;
  }

  async findOne(id: number): Promise<Sale> {
    try {
      const sale = await this.saleModel.findByPk(id, {
        attributes: {
          exclude: ['updatedAt'],
        },
        include: [
          {
            model: SalesDetail,
            attributes: ['quantity', 'price', 'product_id'],
          },
        ],
      });

      if (sale) {
        return sale;
      } else {
        throw new NotFoundException('Sale not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('An error has occurred');
    }
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
