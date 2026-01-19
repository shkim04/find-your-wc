import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { PrismaClientExceptionFilter } from './common/exeception-filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);
  const port = Number(config.get('PORT') ?? 8080);

  app.useLogger(app.get(Logger));
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  await app.listen(port, '0.0.0.0');
}

bootstrap();
