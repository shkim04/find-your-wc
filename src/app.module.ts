import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityController } from './city/city.controller';
import { ContributeController } from './contribute/contribute.controller';
import { CityService } from './city/city.service';
import { ContributeService } from './contribute/contribute.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, CityController, ContributeController],
  providers: [AppService, CityService, ContributeService],
})
export class AppModule {}
