import { Controller, Get, Inject } from '@nestjs/common';
import { CityService } from './city.service';
@Controller('city')
export class CityController {
  @Inject() private cityService: CityService;

  @Get()
  getCity() {
    return this.cityService.getCity();
  }
}
