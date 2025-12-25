import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lineup } from 'src/app/entities/lineup.entity';
import { UTILITY_TYPE } from 'src/app/enums/game/utilityType.enum';
import { Action } from 'src/app/entities/action.entity';
import { ACTION_TYPE } from 'src/app/enums/game/actions.enum';
import { ActionType } from 'src/app/entities/actionType.entity';

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(Action)
    private actionRepository: Repository<Action>,
    @InjectRepository(ActionType)
    private actionTypeRepository: Repository<ActionType>,
  ) {}

  async getActionsType(): Promise<ActionType[]> {
    const actionsTypeQuery = this.actionTypeRepository
      .createQueryBuilder('at')
      .orderBy('at.name', 'ASC');

    const actionsType = await actionsTypeQuery.getMany();

    return actionsType;
  }

  async findActionsByMapAndUtilities({
    mapId,
    actionTypeIds,
  }: {
    mapId: string;
    actionTypeIds: ACTION_TYPE[];
  }): Promise<Action[]> {
    const actionsQuery = this.actionRepository
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.destinationPoint', 'destinationPoint')
      .leftJoinAndSelect('a.map', 'map')
      .leftJoinAndSelect('a.actionType', 'actionType')
      .where('a.mapId = :mapId', { mapId: mapId })
      .andWhere('a.actionTypeId IN (:...actionTypeIds)', {
        actionTypeIds,
      });

    const actions = await actionsQuery.getMany();

    return actions;
  }
}
