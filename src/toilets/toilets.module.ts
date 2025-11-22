import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import KeyvRedis from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import Keyv from 'keyv';

import { PrismaModule } from '../database/prisma.module';

import { ToiletsResolver } from './toilets.resolver';
import { ToiletsService } from './toilets.service';
import { ToiletsRepository } from './toilets.repository';
import { ReviewsModule } from '../reviews/reviews.module';
import { AddressModule } from '../address/address.module';
import { AuthModule } from '../auth/auth.module';

type OriginalError = {
  message: string;
  statusCode: number;
  error: string;
};

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const redisHost = config.get<string>('REDIS_HOST');
        const redisPortConfig = config.get<string | number>('REDIS_PORT');
        const redisPort =
          typeof redisPortConfig === 'number'
            ? redisPortConfig
            : redisPortConfig
              ? Number(redisPortConfig)
              : undefined;

        const redisUrl =
          redisHost || redisPort !== undefined
            ? `redis://${redisHost ?? '127.0.0.1'}${
                redisPort !== undefined && !Number.isNaN(redisPort)
                  ? `:${redisPort}`
                  : ''
              }`
            : undefined;

        const cacheTtlMs = 10_000;

        return {
          ttl: cacheTtlMs,
          isGlobal: true,
          stores: [
            new Keyv({
              store: new KeyvRedis(redisUrl),
              ttl: cacheTtlMs,
            }),
          ],
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          introspection: config.get('NODE_ENV') !== 'production',
          playground: {
            settings: {
              'schema.polling.enable': false,
            },
          },
          includeStacktraceInErrorResponses:
            config.get('NODE_ENV') !== 'production',
          formatError: (error) => {
            const originalError = error.extensions
              ?.originalError as OriginalError;

            if (!originalError) {
              return {
                message: error.message,
                code: error.extensions?.code,
              };
            }

            return {
              message: originalError.message,
              code: error.extensions?.code,
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
