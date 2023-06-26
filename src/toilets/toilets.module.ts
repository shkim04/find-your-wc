import { Module } from '@nestjs/common';
import { ToiletsService } from './toilets.service';
import { ToiletResolver } from './toilets.resolver';

@Module({
  providers: [ToiletResolver, ToiletsService],
})
export class ToiletsModule {}
