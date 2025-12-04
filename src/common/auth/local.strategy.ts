import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'id' });
  }

  async validate(id, password) {
    const reviewId = Number(id);
    if (!password || Number.isNaN(reviewId)) throw new BadRequestException();

    const review = await this.authService.validateContributor({
      id: reviewId,
      password,
    });

    if (!review) throw new UnauthorizedException();

    return review;
  }
}
