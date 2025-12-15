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
import { MapService } from '../services/maps.service';
import { MapsListDto, toMapsDto } from '../dto/dtoOut/MapsDto';

@Controller('maps')
export class MapController {
  constructor(private mapService: MapService) {}

  @Get('')
  async getMaps(): Promise<MapsListDto> {
    const maps = await this.mapService.getActiveMaps();

    return maps.map(toMapsDto);
  }
}
