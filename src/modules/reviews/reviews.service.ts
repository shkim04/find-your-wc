import { Injectable, NotFoundException } from '@nestjs/common';
import { Review } from './models/review';

import { GetReviewArgs } from './dto/args/get-review.args';
import { GetReviewsArgs } from './dto/args/get-reviews.args';
import { CreateReviewInput } from './dto/input/create-review.input';
import { UpdateReviewInput } from './dto/input/update-review.input';
import { DeleteReviewInput } from './dto/input/delete-review.input';

import { ReviewRepository } from './reviews.repository';

import * as bcrypt from 'bcrypt';


@Injectable()
export class ReviewsService {
  constructor(private reviewRepository: ReviewRepository) {}

  public async getReview(args: GetReviewArgs): Promise<Review> {
    const { toiletId, contributedBy } = args;
    const review = await this.reviewRepository.getReview({
      where: {
        toiletId: toiletId,
        contributedBy: contributedBy,
      },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  public async getReviewById(id: number): Promise<Review> {
    const review = await this.reviewRepository.getReview({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  public async getReviews(args: GetReviewsArgs): Promise<Review[]> {
    return await this.reviewRepository.getReviews({
      where: { toiletId: args.toiletId },
    });
  }

  public async createReview(input: CreateReviewInput): Promise<Review> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const review = await this.reviewRepository.createReview({
      data: {
        ...input,
        password: hashedPassword,
      },
    });

    return review;
  }

  public async updateReview(input: UpdateReviewInput): Promise<Review> {
    const review = await this.reviewRepository.updateReview({
      where: { id: input.id },
      data: input,
    });

    return review;
  }

  public async deleteReview(input: DeleteReviewInput): Promise<Review> {
    const review = await this.reviewRepository.deleteReview({
      where: { id: input.id },
    });

    return review;
  }
}
