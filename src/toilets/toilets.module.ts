import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { PrismaModule } from '../database/prisma.module';

import { ToiletsResolver } from './toilets.resolver';
import { ToiletsService } from './toilets.service';
import { ToiletsRepository } from './toilets.repository';
import { ReviewsModule } from '../reviews/reviews.module';
import { AddressModule } from '../address/address.module';
import { AuthModule } from '../auth/auth.module';

import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        ttl: 10,
        isGlobal: true,
        store: redisStore,
        host: config.get('REDIS_HOST'),
        port: config.get('REDIS_POST'),
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          playground: config.get('NODE_ENV') !== 'production',
          formatError: (error) => {
            return {
              message: error.message,
              code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
              name: error.extensions?.name,
            };
          },
        };
      },
      inject: [ConfigService],
    }),
    PrismaModule,
    ReviewsModule,
    AddressModule,
    AuthModule,
  ],
  providers: [ToiletsResolver, ToiletsRepository, ToiletsService],
  exports: [ToiletsResolver, ToiletsService],
})
export class ToiletsModule {}
