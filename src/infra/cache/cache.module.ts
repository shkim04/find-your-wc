// src/infra/cache/cache.module.ts
import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';

@Global()
@Module({
  imports: [
    // CacheModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     const redisUrl = configService.get<string>('REDIS_URL');
    //     const cacheTtlMs = configService.get<number>('CACHE_TTL_MS') ?? 300_000;

    //     return {
    //       ttl: cacheTtlMs,
    //       isGlobal: true,
    //       stores: [
    //         new Keyv({
    //           store: new KeyvRedis(redisUrl),
    //           ttl: cacheTtlMs,
    //         }),
    //       ],
    //     };
    //   },
    // }),
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
  ],
  exports: [CacheModule],
})
export class CacheInfraModule {}
