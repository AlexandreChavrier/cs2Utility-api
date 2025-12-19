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
import { JwtService } from '@nestjs/jwt';

import { zodToNest } from 'src/lib/zod/ZodPipe';

import { LineupService } from '../services/lineups.service';
import {
  GetLineupsDtoIn,
  getLineupsDtoSchema,
} from '../dto/dtoIn/getLineupsDtoIn';
import { LineupListDto, toLineupsDto } from '../dto/dtoOut/LineupsDto';

@Controller('lineups')
export class LineupController {
  constructor(private lineupsService: LineupService) {}

  @Get('')
  async getLineups(
    @Query(zodToNest(getLineupsDtoSchema))
    query: GetLineupsDtoIn,
  ): Promise<LineupListDto> {
    const lineups = await this.lineupsService.findLineupsByMapAndUtilities({
      mapId: query.map,
      typeId: query.type,
    });

    return lineups.map(toLineupsDto);
  }
}
