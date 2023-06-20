import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToiletsModule } from './toilets/toilets.module';

@Module({
  imports: [ConfigModule.forRoot(), ToiletsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
