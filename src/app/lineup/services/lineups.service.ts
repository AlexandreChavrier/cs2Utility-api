import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lineup } from 'src/app/entities/lineup.entity';
import { UTILITY_TYPE } from 'src/app/enums/game/utilityType.enum';

@Injectable()
export class LineupService {
  constructor(
    @InjectRepository(Lineup)
    private lineupRepository: Repository<Lineup>,
  ) {}

  async findLineupsByMapAndUtilities({
    mapId,
    typeId,
  }: {
    mapId: string;
    typeId: UTILITY_TYPE;
  }): Promise<Lineup[]> {
    const lineupsQuery = this.lineupRepository
      .createQueryBuilder('l')
      .leftJoinAndSelect('l.destinationPoint', 'destinationPoint')
      .leftJoinAndSelect('l.map', 'map')
      .leftJoinAndSelect('l.utilityType', 'utilityType')
      .where('l.mapId = :mapId', { mapId: mapId })
      .andWhere('l.utilityTypeId = :typeId', { typeId: typeId });

    const lineups = await lineupsQuery.getMany();

    return lineups;
  }
}
