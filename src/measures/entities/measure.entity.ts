import { Stock } from '../../stock/entities/stock.entity';
import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  HasMany,
} from 'sequelize-typescript';

@Table({ tableName: 'measures' })
export class Measure extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @HasMany(() => Stock)
  stock: Stock[];
}
