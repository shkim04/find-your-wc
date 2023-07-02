import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { Review } from './models/review';
import { GetReviewArgs } from './dto/args/get-review.args';
import { GetReviewsArgs } from './dto/args/get-reviews.args';
import { CreateReviewInput } from './dto/input/create-review.input';
import { UpdateReviewInput } from './dto/input/update-review.input';
import { DeleteReviewInput } from './dto/input/delete-review.input';

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewsService) {}

  @Query(() => Review, { name: 'review', nullable: false })
  async getReview(@Args() getReviewArgs: GetReviewArgs): Promise<Review> {
    return this.reviewService.getReview(getReviewArgs);
  }

  @Query(() => [Review], { name: 'reviews', nullable: false })
  async getReviews(@Args() getReviewsArgs: GetReviewsArgs): Promise<Review[]> {
    return this.reviewService.getReviews(getReviewsArgs);
  }

  @Mutation(() => Review)
  async createReview(
    @Args('createReviewData') createReviewData: CreateReviewInput,
  ): Promise<Review> {
    return this.reviewService.createReview(createReviewData);
  }

  @Mutation(() => Review)
  async updateReview(
    @Args('updateReviewData') updateReviewData: UpdateReviewInput,
  ): Promise<Review> {
    return this.reviewService.updateReview(updateReviewData);
  }

  @Mutation(() => Review)
  async deleteReview(
    @Args('deleteReviewData') deleteReviewData: DeleteReviewInput,
  ): Promise<Review> {
    return this.reviewService.deleteReview(deleteReviewData);
  }
}
