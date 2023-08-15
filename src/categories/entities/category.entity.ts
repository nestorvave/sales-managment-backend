import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
@Table
export class Category extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  description: string;
}
