import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesModule } from './categories/categories.module';
import { MeasuresModule } from './measures/measures.module';
import { ProvidersModule } from './providers/providers.module';
import { StockModule } from './stock/stock.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { SalesDetailsModule } from './sales_details/sales_details.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    CategoriesModule,
    MeasuresModule,
    ProvidersModule,
    StockModule,
    ProductsModule,
    SalesModule,
    SalesDetailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
