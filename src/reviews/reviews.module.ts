import { Module } from '@nestjs/common';
import { ReviewResolver } from './reviews.resolver';
import { ReviewsService } from './reviews.service';
import { PrismaModule } from 'src/database/prisma.module';
import { ReviewRepository } from './reviews.repository';

@Module({
  imports: [PrismaModule],
  providers: [ReviewResolver, ReviewsService, ReviewRepository],
  exports: [ReviewResolver, ReviewsService],
})
export class ReviewsModule {}
