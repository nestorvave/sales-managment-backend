import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = await this.productModel.create({
        ...createProductDto,
      });
      return product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new InternalServerErrorException(
        'An error occurred while creating the product',
      );
    }
  }

  findAll(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.findOne(id);
    try {
      const [updatedRowsCount, updatedCategories] =
        await this.productModel.update(
          { ...updateProductDto },
          { where: { id }, returning: true },
        );
      if (updatedRowsCount === 0) {
        throw new InternalServerErrorException(
          `Can not update product with id ${id}`,
        );
      }
      return updatedCategories[0];
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while updating the category',
      );
    }
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await product.destroy();
  }
}
