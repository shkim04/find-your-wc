import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get('PORT');
  const rabbitUser = configService.get('RABBITMQ_USER');
  const rabbitPassword = configService.get('RABBITMQ_PASSWORD');
  const rabbitHost = configService.get('RABBITMQ_HOST');
  const rabbitQueueName = configService.get('RABBITMQ_QUEUE_NAME');

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${rabbitUser}:${rabbitPassword}@${rabbitHost}`],
      queue: rabbitQueueName,
      noAck: false,
    },
  });

  await app.startAllMicroservices();
  await app.listen(parseInt(port) || 3000);
}
bootstrap();
