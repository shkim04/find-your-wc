import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Review } from './models/review';
import { GetReviewArgs } from './dto/args/get-review.args';
import { GetReviewsArgs } from './dto/args/get-reviews.args';

@Injectable()
export class ReviewsService {
  private reviews: Review[] = [];

  public async getReview(getReviewArgs: GetReviewArgs): Promise<Review> {
    return this.reviews.find((review) => review.id === getReviewArgs.id);
  }

  public async getReviews(getReviewsArgs: GetReviewsArgs): Promise<Review[]> {
    return this.reviews.filter(
      (toilet) => getReviewsArgs.ids.indexOf(toilet.id) !== -1,
    );
  }

  public async createReview(createReviewData): Promise<Review> {
    const review: Review = {
      id: uuidv4(),
      ...createReviewData,
    };

    this.reviews.push(review);
    return review;
  }

  public async updateReview(updateReviewData): Promise<Review> {
    const review = this.reviews.find(
      (review) => review.id === updateReviewData.id,
    );

    Object.assign(review, updateReviewData);
    return review;
  }

  public async deleteReview(deleteReviewData): Promise<Review> {
    const reviewIndex = this.reviews.findIndex(
      (review) => review.id === deleteReviewData.id,
    );
    const review = this.reviews[reviewIndex];

    this.reviews = this.reviews.filter(
      (review, index) => index !== reviewIndex,
    );

    return review;
  }
}
