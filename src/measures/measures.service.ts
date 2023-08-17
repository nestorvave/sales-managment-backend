import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMeasureDto } from './dto/create-measure.dto';
import { UpdateMeasureDto } from './dto/update-measure.dto';
import { Measure } from './entities/measure.entity';

@Injectable()
export class MeasuresService {
  constructor(
    @InjectModel(Measure)
    private measuresModel: typeof Measure,
  ) {}
  async create(createMeasureDto: CreateMeasureDto): Promise<Measure> {
    try {
      const measure = await this.measuresModel.create({ ...createMeasureDto });
      return measure;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while creating the category',
      );
    }
  }

  findAll(): Promise<Measure[]> {
    return this.measuresModel.findAll();
  }

  async findOne(term: string): Promise<Measure> {
    console.log(term);
    let measure: Measure;
    if (!isNaN(+term)) {
      console.log('---here');
      measure = await this.measuresModel.findByPk(term);
    } else {
      measure = await this.measuresModel.findOne({
        where: { name: term },
      });
    }
    if (!measure) throw new NotFoundException(`Measure ${term} was not found`);
    return measure;
  }

  async update(
    id: number,
    updateMeasureDto: UpdateMeasureDto,
  ): Promise<Measure> {
    const measure = await this.findOne(id.toString());
    try {
      const updatedRowsCount = await this.measuresModel.update(
        { ...updateMeasureDto },
        { where: { id } },
      );
      if (updatedRowsCount[0] === 0) {
        throw new InternalServerErrorException(
          `Cannot update category with id ${id}`,
        );
      }
      return measure; 
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while updating the category',
      );
    }
  }

  async remove(id: number) {
    const measure = await this.findOne(id.toString());
    await measure.destroy();
  }
}
