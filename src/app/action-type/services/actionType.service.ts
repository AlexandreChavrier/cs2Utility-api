import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActionType } from 'src/app/entities/actionType.entity';

@Injectable()
export class ActionTypeService {
  constructor(
    @InjectRepository(ActionType)
    private actionTypeRepository: Repository<ActionType>,
  ) {}

  async getActionTypes(): Promise<ActionType[]> {
    const actionTypesQuery = this.actionTypeRepository
      .createQueryBuilder('at')
      .orderBy('at.name', 'ASC');

    const actionTypes = await actionTypesQuery.getMany();

    return actionTypes;
  }
}
