import { Injectable } from '@nestjs/common';

@Injectable()
export class ToiletsService {
  getToilets() {
    return 'This is the list of toilets in the target city';
  }
}
