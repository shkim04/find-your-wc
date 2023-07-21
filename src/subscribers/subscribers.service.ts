import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscribersService {
  async add(subscriber) {
    console.log(`${subscriber} subscribed!`);
  }
}
