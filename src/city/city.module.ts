import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';

@Module({
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
