import { Controller, Get } from '@nestjs/common';
import { ToiletsService } from './toilets.service';

@Controller('toilets')
export class ToiletsController {
  constructor(private toiletsService: ToiletsService) {}

  @Get()
  getToilets() {
    return this.toiletsService.getToilets();
  }
}
