import { Injectable } from '@nestjs/common';
import { Review } from './models/review';
import { GetReviewArgs } from './dto/args/get-review.args';
import { ReviewRepository } from './reviews.repository';
import { CreateReviewInput } from './dto/input/create-review.input';
import { UpdateReviewInput } from './dto/input/update-review.input';
import { DeleteReviewInput } from './dto/input/delete-review.input';

import * as bcrypt from 'bcrypt';

@Injectable()
export class ReviewsService {
  constructor(private reviewRepository: ReviewRepository) {}

  public async getReview(getReviewArgs: GetReviewArgs): Promise<Review> {
    return await this.reviewRepository.getReview({
      where: { contributedBy: getReviewArgs.contributedBy },
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
    const hashedPassword = await bcrypt.hash(createReviewData.password, 10);
    const review = await this.reviewRepository.createReview({
      data: {
        ...createReviewData,
        password: hashedPassword,
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
