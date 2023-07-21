import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'SUBSCRIBERS_SERVICE',
      useFactory: (configService: ConfigService) => {
        const rabbitUser = configService.get('RABBITMQ_USER');
        const rabbitPassword = configService.get('RABBITMQ_PASSWORD');
        const rabbitHost = configService.get('RABBITMQ_HOST');
        const rabbitQueueName = configService.get('RABBITMQ_QUEUE_NAME');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${rabbitUser}:${rabbitPassword}@${rabbitHost}`],
            queue: rabbitQueueName,
            noAck: false,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class SubscribersModule {}
