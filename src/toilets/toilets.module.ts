import { Module } from '@nestjs/common';
import { ToiletsService } from './toilets.service';
import { ToiletsResolver } from './toilets.resolver';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { AddressModule } from 'src/address/address.module';

@Module({
  imports: [ReviewsModule, AddressModule],
  providers: [ToiletsResolver, ToiletsService],
})
export class ToiletsModule {}
