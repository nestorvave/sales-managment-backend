
import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { SalesDetail } from 'src/sales_details/entities/sales_detail.entity';


@Table({ tableName: 'sales' })
export class Sale extends Model{
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  amount: number;

  @HasMany(() => SalesDetail)
  details: SalesDetail;
}
