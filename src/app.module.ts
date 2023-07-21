import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ToiletsModule } from './toilets/toilets.module';
import { SubscribersModule } from './subscribers/subscribers.module';

@Module({
  imports: [ConfigModule.forRoot(), ToiletsModule, SubscribersModule],
  providers: [],
})
export class AppModule {}
