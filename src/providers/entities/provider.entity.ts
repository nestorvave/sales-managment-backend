import {
  Column,
  Model,
  PrimaryKey,
  DataType,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'providers' })
export class Provider extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;
}
