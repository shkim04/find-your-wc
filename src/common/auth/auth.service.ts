import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { ReviewsService } from '../../modules/reviews/reviews.service';

@Injectable()
export class AuthService {
  constructor(private readonly reviewsService: ReviewsService) {}

  async validateContributor(reviewData) {
    const review = await this.reviewsService
      .getReviewById(reviewData.id)
      .catch(() => null);

    if (!review) return null;

    const isMatch = await bcrypt.compare(reviewData.password, review.password);

    if (!isMatch) return null;

    return review;
  }
}
