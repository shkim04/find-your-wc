import { Module } from '@nestjs/common';
import { AddressResolver } from './address.resolver';
import { AddressService } from './address.service';
import { PrismaModule } from 'src/database/prisma.module';
import { AddressRepository } from './address.repository';

@Module({
  imports: [PrismaModule],
  providers: [AddressResolver, AddressService, AddressRepository],
  exports: [AddressResolver, AddressService],
})
export class AddressModule {}
