import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from './models/review';
import { GetReviewArgs } from './dto/args/get-review.args';
import { GetReviewsArgs } from './dto/args/get-reviews.args';
import { CreateReviewInput } from './dto/input/create-review.input';
import { UpdateReviewInput } from './dto/input/update-review.input';
import { DeleteReviewInput } from './dto/input/delete-review.input';
import { ReviewGuard } from '../auth/guards/gql.guard';

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
  @UseGuards(ReviewGuard('updateReviewData'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateReview(
    @Args('updateReviewData') updateReviewData: UpdateReviewInput,
  ): Promise<Review> {
    return this.reviewService.updateReview(updateReviewData);
  }

  @Mutation(() => Review)
  @UseGuards(ReviewGuard('deleteReviewData'))
  async deleteReview(
    @Args('deleteReviewData') deleteReviewData: DeleteReviewInput,
  ): Promise<Review> {
    return this.reviewService.deleteReview(deleteReviewData);
  }
}
