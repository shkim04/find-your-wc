import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ReviewsService } from '../reviews/reviews.service';

@Injectable()
export class AuthService {
  constructor(private readonly reviewsService: ReviewsService) {}

  async validateContributor(reviewData) {
    const review = await this.reviewsService.getReview({
      contributedBy: reviewData.contributedBy,
    });

    const isMatch = await bcrypt.compare(reviewData.password, review.password);

    if (!isMatch) return null;

    return review;
  }
}
