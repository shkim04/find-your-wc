import { Controller, Get } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private cityService: CityService) {}

  @Get()
  getCity() {
    return this.cityService.getCity();
  }
}
