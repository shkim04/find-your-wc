import { Module } from '@nestjs/common';
import { ReviewResolver } from './reviews.resolver';
import { ReviewsService } from './reviews.service';
import { ReviewRepository } from './reviews.repository';

import { PrismaModule } from '../database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ReviewResolver, ReviewsService, ReviewRepository],
  exports: [ReviewResolver, ReviewsService],
})
export class ReviewsModule {}
