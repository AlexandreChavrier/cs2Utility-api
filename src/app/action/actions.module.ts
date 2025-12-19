import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationPoint } from '../entities/destinationPoint.entity';
import { Action } from '../entities/action.entity';
import { ActionController } from './controllers/action.controller';
import { ActionService } from './services/action.service';
import { ActionType } from '../entities/actionType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Action, ActionType, DestinationPoint])],
  controllers: [ActionController],
  providers: [ActionService],
  exports: [ActionService],
})
export class ActionModule {}
