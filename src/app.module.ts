import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ToiletsModule } from './modules/toilets/toilets.module';
import { LoggerModule } from 'nestjs-pino';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { GraphqlInfraModule } from './infra/graphql/graphql.module';
import { CacheInfraModule } from './infra/cache/cache.module';
import { PrismaModule } from './infra/database/prisma.module';

import { ReviewsModule } from './modules/reviews/reviews.module';
import { AddressModule } from './modules/address/address.module';

import { AuthModule } from './common/auth/auth.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
        customLogLevel: (req, res, err) => {
          if (res.statusCode >= 500) return 'error';
          if (res.statusCode >= 400) return 'warn';
          if (err) return 'warn';
          return 'info';
        },
      },
    }),
    PrometheusModule.register(),
    ToiletsModule,
    ReviewsModule,
    AddressModule,
    PrismaModule,
    AuthModule,
    GraphqlInfraModule,
    CacheInfraModule,
    HealthModule
  ],
  providers: [],
})
export class AppModule {}
