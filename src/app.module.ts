import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ToiletsModule } from './toilets/toilets.module';

@Module({
  imports: [ConfigModule.forRoot(), ToiletsModule],
  providers: [],
})
export class AppModule {}
