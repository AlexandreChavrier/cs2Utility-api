import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapController } from './controllers/maps.controller';
import { MapService } from './services/maps.service';
import { Map } from '../entities/map.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Map])],
  controllers: [MapController],
  providers: [MapService],
  exports: [MapService],
})
export class MapModule {}
