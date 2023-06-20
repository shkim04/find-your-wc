import { Module } from '@nestjs/common';
import { ToiletsService } from './toilets.service';
import { ToiletsController } from './toilets.controller';

@Module({
  controllers: [ToiletsController],
  providers: [ToiletsService],
  exports: [ToiletsService],
})
export class ToiletsModule {}
