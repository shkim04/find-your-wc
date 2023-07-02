import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Review } from './models/review';
import { GetReviewArgs } from './dto/args/get-review.args';
import { ReviewRepository } from './reviews.repository';
import { CreateReviewInput } from './dto/input/create-review.input';
import { UpdateReviewInput } from './dto/input/update-review.input';
import { DeleteReviewInput } from './dto/input/delete-review.input';

@Injectable()
export class ReviewsService {
  constructor(private reviewRepository: ReviewRepository) {}

  public async getReview(getReviewArgs: GetReviewArgs): Promise<Review> {
    return await this.reviewRepository.getReview({
      where: { id: getReviewArgs.id },
    });
  }

  public async getReviews(getReviewsArgs): Promise<Review[]> {
    return await this.reviewRepository.getReviews({
      where: { toiletId: getReviewsArgs.toiletId },
    });
  }

  public async createReview(
    createReviewData: CreateReviewInput,
  ): Promise<Review> {
    const review = await this.reviewRepository.createReview({
      data: {
        id: uuidv4(),
        ...createReviewData,
      },
    });

    return review;
  }

  public async updateReview(
    updateReviewData: UpdateReviewInput,
  ): Promise<Review> {
    const review = await this.reviewRepository.updateReview({
      where: { id: updateReviewData.id },
      data: updateReviewData,
    });

    return review;
  }

  public async deleteReview(
    deleteReviewData: DeleteReviewInput,
  ): Promise<Review> {
    const review = await this.reviewRepository.deleteReview({
      where: { id: deleteReviewData.id },
    });

    return review;
  }
}
