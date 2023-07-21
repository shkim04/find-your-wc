import { Inject } from '@nestjs/common';
import { Args, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

@Resolver()
export class SubscribersResolver {
  constructor(
    @Inject('SBUSCRIBERS_SERVICE') private subscribersService: ClientProxy,
  ) {}

  async addSubscriber(@Args() addSubscriberArgs) {
    return this.subscribersService.send(
      {
        cmd: 'add-subscriber',
      },
      addSubscriberArgs,
    );
  }
}
