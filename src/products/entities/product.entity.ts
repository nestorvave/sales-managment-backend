import {
  BelongsTo,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Stock } from 'src/stock/entities/stock.entity';

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

  @BelongsTo(() => Stock)
  category: Stock;
}
