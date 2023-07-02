import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloDriver,
  ApolloDriverConfig,
  // ApolloFederationDriver,
  // ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { PrismaModule } from 'src/database/prisma.module';

import { ToiletsResolver } from './toilets.resolver';
import { ToiletsService } from './toilets.service';
import { ToiletsRepository } from './toilets.repository';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { AddressModule } from 'src/address/address.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PrismaModule,
    ReviewsModule,
    AddressModule,
  ],
  providers: [ToiletsResolver, ToiletsRepository, ToiletsService],
  exports: [ToiletsResolver, ToiletsService],
})
export class ToiletsModule {}
