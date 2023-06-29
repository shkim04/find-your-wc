import { Module } from '@nestjs/common';
import { AddressResolver } from './address.resolver';
import { AddressService } from './address.service';

@Module({
  providers: [AddressResolver, AddressService],
})
export class AddressModule {}
