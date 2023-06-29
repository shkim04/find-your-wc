import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Review } from './models/reviews';

@Injectable()
export class ReviewsService {
  private reviews: Review[] = [];
  async getReview(getReviewArg) {
    return this.reviews.find((review) => review.id === getReviewArg.id);
  }

  async getReviews(getReviewsArg) {
    return getReviewsArg.ids.map((id) => this.getReview({ id }));
  }

  async createReview(createReviewData) {
    const review: Review = {
      id: uuidv4(),
      ...createReviewData,
    };

    this.reviews.push(review);
    return review;
  }

  async updateReview(updateReviewData) {
    const review = this.reviews.find(
      (review) => review.id === updateReviewData.id,
    );

    Object.assign(review, updateReviewData);
    return review;
  }

  async deleteReview(deleteReviewData) {
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
