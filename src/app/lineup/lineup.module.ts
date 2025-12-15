import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lineup } from '../entities/lineup.entity';
import { DestinationPoint } from '../entities/destinationPoint.entity';
import { LineupController } from './controllers/lineups.controller';
import { LineupsService } from './services/lineups.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lineup, DestinationPoint])],
  controllers: [LineupController],
  providers: [LineupsService],
  exports: [LineupsService],
})
export class LineupModule {}
