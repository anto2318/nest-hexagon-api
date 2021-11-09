import { Module } from '@nestjs/common';
import { UnitOfWork } from './unitOfWork/unitOfWork';
import { DatabaseModule } from './database/database.module';
import { ControllersModule } from './controllers/controllers.module';
import { ApplicationModule } from '../application/application.module';

@Module({
  imports: [DatabaseModule, ApplicationModule],
  providers: [UnitOfWork],
  controllers: [ControllersModule]
})
export class InfrastructureModule{}
