import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ReviewsService } from '../reviews/reviews.service';

@Injectable()
export class AuthService {
  constructor(private reviewsService: ReviewsService) {}

  async validateContributor(reviewData) {
    const review = await this.reviewsService.getReview({
      contributedBy: reviewData.contributedBy,
    });
    const isMatch = await this.comparePassword(
      reviewData.password,
      review.password,
    );
    if (!isMatch) {
      return null;
    }
    return review;
  }

  async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async comparePassword(password, hash) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
}
