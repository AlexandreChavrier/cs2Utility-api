import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationPoint } from '../entities/destinationPoint.entity';
import { Action } from '../entities/action.entity';
import { ActionType } from '../entities/actionType.entity';
import { ActionTypeController } from './controllers/actionType.controller';
import { ActionTypeService } from './services/actionType.service';

@Module({
  imports: [TypeOrmModule.forFeature([Action, ActionType])],
  controllers: [ActionTypeController],
  providers: [ActionTypeService],
  exports: [ActionTypeService],
})
export class ActionTypeModule {}
