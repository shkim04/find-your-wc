import { Module } from '@nestjs/common';
import { ContributeController } from './contribute.controller';
import { ContributeService } from './contribute.service';

@Module({
  controllers: [ContributeController],
  providers: [ContributeService],
  exports: [ContributeService],
})
export class ContributeModule {}
