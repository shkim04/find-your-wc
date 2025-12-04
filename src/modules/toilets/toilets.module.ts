import { Module } from '@nestjs/common';

import { ToiletsResolver } from './toilets.resolver';
import { ToiletsService } from './toilets.service';
import { ToiletsRepository } from './toilets.repository';

import { PrismaModule } from '../../infra/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ToiletsResolver, ToiletsRepository, ToiletsService],
  exports: [ToiletsService],
})
export class ToiletsModule {}
