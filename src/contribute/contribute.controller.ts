import { Controller, Get, Inject } from '@nestjs/common';
import { ContributeService } from './contribute.service';
@Controller('contribute')
export class ContributeController {
  @Inject() private contributeService: ContributeService;

  @Get()
  getContributes() {
    return this.contributeService.getContributes();
  }
}
