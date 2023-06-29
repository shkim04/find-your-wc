import { Module } from '@nestjs/common';
import { ReviewResolver } from './reviews.resolver';
import { ReviewsService } from './reviews.service';

@Module({
  providers: [ReviewResolver, ReviewsService],
})
export class ReviewsModule {}
