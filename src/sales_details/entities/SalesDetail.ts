import { Column, DataType, ForeignKey } from 'sequelize-typescript';
import { Sale } from 'src/sales/entities/sale.entity';

export class SalesDetail {
  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @ForeignKey(() => Sale)
  @Column({ type: DataType.INTEGER, allowNull: true })
  sales_id: number;
}
