import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Category } from 'src/categories/entities/category.entity';
import { Measure } from '../../measures/entities/measure.entity';
@Table({ tableName: 'stock' })
export class Stock extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: true })
  category_id?: number;

  @ForeignKey(() => Measure)
  @Column({ type: DataType.INTEGER, allowNull: false })
  measure_id?: number;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsTo(() => Measure)
  measure: Measure;
}
