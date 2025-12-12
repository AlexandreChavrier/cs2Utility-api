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
import { ActionTypeService } from '../services/actionType.service';

@Controller('action-types')
export class ActionTypeController {
  constructor(private actionTypeService: ActionTypeService) {}

  @Get('')
  async getActionTypes() {
    const actionTypes = await this.actionTypeService.getActionTypes();

    return actionTypes;
  }
}
