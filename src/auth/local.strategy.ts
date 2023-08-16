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
    super({ usernameField: 'contributedBy' });
  }

  async validate(contributedBy, password) {
    if (!password) throw new BadRequestException();

    const review = await this.authService.validateContributor({
      contributedBy,
      password,
    });

    if (!review) throw new UnauthorizedException();

    return review;
  }
}
