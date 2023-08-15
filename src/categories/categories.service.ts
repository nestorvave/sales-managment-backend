import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private categoriesModel: typeof Category,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category = await this.categoriesModel.create({
        ...createCategoryDto,
      });
      return category;
    } catch (error) {
      console.error('Error creating category:', error);
      throw new InternalServerErrorException('An error occurred while creating the category');
    }
  }

  findAll(): Promise<Category[]> {
    return this.categoriesModel.findAll();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoriesModel.findByPk(id);
    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);
    try {
      const [updatedRowsCount, updatedCategories] =
        await this.categoriesModel.update(
          { ...updateCategoryDto },
          { where: { id }, returning: true },
        );
      if (updatedRowsCount === 0) {
        throw new InternalServerErrorException(
          `Can not update category with id ${id}`,
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
    const category = await this.findOne(id);
    await category.destroy();
  }
}
