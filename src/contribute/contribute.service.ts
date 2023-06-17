import { Injectable } from '@nestjs/common';

@Injectable()
export class ContributeService {
  getContributes() {
    return 'This is Contribute';
  }
}
