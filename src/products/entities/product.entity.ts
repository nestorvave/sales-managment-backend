import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { SalesDetail } from 'src/sales_details/entities/sales_detail.entity';


@Table({ tableName: 'products' })
export class Product extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  image: string;

  @HasMany(() => SalesDetail)
  salesdetail: SalesDetail;
}
