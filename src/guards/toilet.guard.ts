import { CanActivate, Inject, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ReviewsService } from 'src/reviews/reviews.service';

@Injectable()
export class ToiletAuthGuard implements CanActivate {
  constructor(@Inject(ReviewsService) private reviewsService: ReviewsService) {}

  async canActivate(context: GqlExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    return false;
  }
}
