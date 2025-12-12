import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lineup } from '../entities/lineup.entity';
import { DestinationPoint } from '../entities/destinationPoint.entity';
import { LineupController } from './controllers/lineups.controller';
import { LineupService } from './services/lineups.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lineup, DestinationPoint])],
  controllers: [LineupController],
  providers: [LineupService],
  exports: [LineupService],
})
export class LineupModule {}
