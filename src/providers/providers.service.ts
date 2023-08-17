import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProvidersService {
  constructor(@InjectModel(Provider) private providersModel: typeof Provider) {}

  async create(createProviderDto: CreateProviderDto): Promise<Provider> {
    try {
      const provider = await this.providersModel.create({
        ...createProviderDto,
      });

      return provider;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while creating',
      );
    }
  }

  async findAll(): Promise<Provider[]> {
    return this.providersModel.findAll();
  }

  async findOne(id: number): Promise<Provider> {
    const provider = await this.providersModel.findOne({ where: { id } });
    if (!provider) throw new NotFoundException(`Provider ${id} not found`);
    console.log(provider);
    return provider;
  }

  async update(
    id: number,
    updateProviderDto: UpdateProviderDto,
  ): Promise<Provider> {
    await this.findOne(id);
    try {
      const [updatedRowsCount, updatedCategories] =
        await this.providersModel.update(
          { ...updateProviderDto },
          { where: { id }, returning: true },
        );
      if (updatedRowsCount === 0) {
        throw new InternalServerErrorException(
          `Cannot update provider with id ${id}`,
        );
      }
      return updatedCategories[0];
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while updating the category',
      );
    }
  }

  async remove(id: number) {
    const provider = await this.findOne(id);
    provider.destroy();
  }
}
