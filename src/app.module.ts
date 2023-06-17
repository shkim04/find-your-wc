import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { ContributeModule } from './contribute/contribute.module';

@Module({
  imports: [ConfigModule.forRoot(), CityModule, ContributeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
