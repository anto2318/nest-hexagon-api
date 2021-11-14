import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ControllersModule } from './controllers/controllers.module';
import { ApplicationModule } from '../application/application.module';

@Module({
  imports: [DatabaseModule, ApplicationModule],
  controllers: [ControllersModule]
})
export class InfrastructureModule{}
