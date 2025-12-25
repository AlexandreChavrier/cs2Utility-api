import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Request,
  Headers,
  UnauthorizedException,
  Query,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { zodToNest } from 'src/lib/zod/ZodPipe';
import { ActionService } from '../services/action.service';
import {
  GetActionsDtoIn,
  getActionsDtoSchema,
} from '../dto/dtoIn/getActionsDtoIn';
import { ActionListDto, toActionsDto } from '../dto/dtoOut/ActionsDto';

@Controller('actions')
export class ActionController {
  constructor(private actionService: ActionService) {}

  @Get('')
  async getActions(
    @Query(zodToNest(getActionsDtoSchema))
    query: GetActionsDtoIn,
  ): Promise<ActionListDto> {
    const actions = await this.actionService.findActionsByMapAndUtilities({
      mapId: query.map,
      actionTypeIds: query.actionTypes,
    });

    return actions.map(toActionsDto);
  }
}
