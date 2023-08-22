import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import responseCachePlugin from '@apollo/server-plugin-response-cache';

import { PrismaModule } from '../database/prisma.module';

import { ToiletsResolver } from './toilets.resolver';
import { ToiletsService } from './toilets.service';
import { ToiletsRepository } from './toilets.repository';
import { ReviewsModule } from '../reviews/reviews.module';
import { AddressModule } from '../address/address.module';
import { AuthModule } from '../auth/auth.module';

// import Keyv from 'keyv';
// import { KeyvAdapter } from '@apollo/utils.keyvadapter';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register(),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => {
        // const redisUser = config.get('REDIS_USERNAME');
        // const redisPass = config.get('REDIS_USERNAME');
        // const redisHost = config.get('REDIS_HOST');
        // const redisPort = config.get('REDIS_PORT');

        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          // cache: new KeyvAdapter(
          //   new Keyv(
          //     `redis://${redisUser}:${redisPass}@${redisHost}:${redisPort}`,
          //   ),
          // ),
          cacheControl: {
            defaultMaxAge: 60,
          },
          plugins: [responseCachePlugin()],
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
