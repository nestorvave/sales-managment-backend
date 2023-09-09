import { Injectable } from '@nestjs/common';
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
  async create(createSaleDto: CreateSaleDto) {
    const { amount, details } = createSaleDto;
    let transaction: Transaction;

    try {
      transaction = await this.sequelize.transaction();

      const newSale = await this.saleModel.create({ amount }, { transaction });
      console.log(newSale);


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
      throw err;
    }
  }
  findAll() {
    return `This action returns all sales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
