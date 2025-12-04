// src/infra/graphql/graphql.module.ts
import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';

type OriginalError = {
  message: string;
  statusCode: number;
  error: string;
};

@Module({
  imports: [
    // GraphQLModule.forRootAsync<ApolloDriverConfig>({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     driver: ApolloDriver,
    //     autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //     sortSchema: true,
    //     playground: configService.get('NODE_ENV') !== 'production',
    //     context: ({ req, res }) => ({ req, res }),
    //   }),
    // }),
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
  ],
  exports: [GraphQLModule],
})
export class GraphqlInfraModule {}
