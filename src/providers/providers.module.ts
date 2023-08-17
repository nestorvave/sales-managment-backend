import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { Provider } from './entities/provider.entity';

@Module({
  imports: [SequelizeModule.forFeature([Provider])],
  controllers: [ProvidersController],
  providers: [ProvidersService],
})
export class ProvidersModule {}
