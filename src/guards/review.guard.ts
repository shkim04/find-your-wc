import { CanActivate, Inject, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ReviewsService } from 'src/reviews/reviews.service';

@Injectable()
export class ReviewAuthGuard implements CanActivate {
  constructor(@Inject(ReviewsService) private reviewsService: ReviewsService) {}

  async canActivate(context: GqlExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { deleteReviewData } = ctx.getArgs();
    console.log(ctx.getArgs());
    const { id, contributedBy, password } = deleteReviewData;

    const reviewInfo = await this.reviewsService.getReview({ id: id });
    if (
      reviewInfo.contributedBy === contributedBy &&
      reviewInfo.password === password
    ) {
      return true;
    }

    return false;
  }
}
