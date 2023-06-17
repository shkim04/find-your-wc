import { Controller, Get } from '@nestjs/common';
import { ContributeService } from './contribute.service';

@Controller('contribute')
export class ContributeController {
  constructor(private contributeService: ContributeService) {}

  @Get()
  getContributes() {
    return this.contributeService.getContributes();
  }
}
