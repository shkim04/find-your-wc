import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from './models/review';
import { GetReviewArgs } from './dto/args/get-review.args';
import { GetReviewsArgs } from './dto/args/get-reviews.args';
import { CreateReviewInput } from './dto/input/create-review.input';
import { UpdateReviewInput } from './dto/input/update-review.input';
import { DeleteReviewInput } from './dto/input/delete-review.input';
import { ReviewGuard } from '../../common/auth/guards/gql.guard';

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewsService) {}

  @Query(() => Review, { name: 'review', nullable: false })
  async getReview(@Args() args: GetReviewArgs): Promise<Review> {
    return this.reviewService.getReview(args);
  }

  @Query(() => [Review], { name: 'reviews', nullable: false })
  async getReviews(@Args() args: GetReviewsArgs): Promise<Review[]> {
    return this.reviewService.getReviews(args);
  }

  @Mutation(() => Review)
  async createReview(@Args('input') input: CreateReviewInput): Promise<Review> {
    return this.reviewService.createReview(input);
  }

  @Mutation(() => Review)
  @UseGuards(ReviewGuard('updateReviewData'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateReview(@Args('input') input: UpdateReviewInput): Promise<Review> {
    return this.reviewService.updateReview(input);
  }

  @Mutation(() => Review)
  @UseGuards(ReviewGuard('deleteReviewData'))
  async deleteReview(@Args('input') input: DeleteReviewInput): Promise<Review> {
    return this.reviewService.deleteReview(input);
  }
}
