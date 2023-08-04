import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/';
import { AuthService } from './auth.service';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [PassportModule, ReviewsModule],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
