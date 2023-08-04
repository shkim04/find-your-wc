import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
  getRequest(context: GqlExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const { deleteReviewData } = ctx.getArgs();
    req.body = deleteReviewData;

    return req;
  }
}
