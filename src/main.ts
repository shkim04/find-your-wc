import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { PrismaClientExceptionFilter } from './exeception-filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);
  const port = config.get('PORT');

  app.useLogger(app.get(Logger));
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  await app.listen(parseInt(port) || 3000);
}

bootstrap();
