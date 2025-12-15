import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lineup } from 'src/app/entities/lineup.entity';
import { UTILITY_TYPE } from 'src/app/enums/game/utilityType.enum';
import { Map } from 'src/app/entities/map.entity';

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(Map)
    private mapRepository: Repository<Map>,
  ) {}

  async getAllMaps() {}

  async getActiveMaps(): Promise<Map[]> {
    const mapQuery = this.mapRepository
      .createQueryBuilder('map')
      .where('map.active = :active', { active: true });

    const maps = await mapQuery.getMany();

    return maps;
  }
}
