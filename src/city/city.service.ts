import { Injectable } from '@nestjs/common';

@Injectable()
export class CityService {
  getCity() {
    return 'This is Jeonju';
  }
}
