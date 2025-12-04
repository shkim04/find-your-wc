import { Injectable, mixin } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export const ReviewGuard: any = (args) => {
  @Injectable()
  class GqlAuthGuard extends AuthGuard('local') {
    getRequest(context: GqlExecutionContext): any {
      const ctx = GqlExecutionContext.create(context);
      const { req } = ctx.getContext();
      req.body = ctx.getArgs()[args];

      return req;
    }
  }

  return mixin(GqlAuthGuard);
};
